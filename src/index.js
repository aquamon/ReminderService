const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const {createChannel} = require('./utils/messageQueue');

// const {sendBasicEmail} = require('./services/email-service');

const jobs = require('./utils/job');

const TicketController = require('./controllers/ticket-controller');

const setUpAndStartServer = async ()=>{

    const app = express(); 
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    // const channel = await createChannel();

    app.post('/api/v1/tickets' , TicketController.create);


    app.listen(PORT , ()=>{
        console.log(`Starting Server on Port : ${PORT}`);

        // sendBasicEmail(
        //     'support@codevamp2.com',
        //     'redminote4.1947@gmail.com',
        //     'This is a TEST MAIL',
        //     'This is a TEST BODY'
        //     );

        jobs();

    });

} 

setUpAndStartServer();