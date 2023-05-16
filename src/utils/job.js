const cron = require('node-cron');
const emailService = require('../services/email-service')
const sender = require('../config/emailConfig');
/**
 * 
 * 10:00 am
 * Every 5 minutes
 * Check are their any pending emails which was expected to be sent
 * by now and is pending
 */

const setupJobs = async () => { 
    cron.schedule('*/1 * * * *',async ()=>{
        // console.log('running a task every 2 mins');
        const response =  await emailService.fetchPendingEmails();
        console.log(response);

        response.forEach((email) => {

            sender.sendMail({
                to : email.recipientEmail,
                subject : email.subject,
                text : email.content
            },async (err,data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id,{status : 'SUCCESS'});
                }
            })
            
        });

    });
}

module.exports = setupJobs; 
    