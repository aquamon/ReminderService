const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');

const cron = require('node-cron');

const setUpAndStartServer = ()=>{

    const app = express(); 
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.listen(PORT , ()=>{
        console.log(`Starting Server on Port : ${PORT}`);

        sendBasicEmail('support@codevamp2.com','redminote4.1947@gmail.com','This is a TEST MAIL','This is a TEST BODY');

        cron.schedule('*/1 * * * *',()=>{
            console.log('runnign a task every 2 mins');
        })

    });

} 

setUpAndStartServer();