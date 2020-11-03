const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
// const inquirer = require("inquirer");

function onRequest(req,res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   fs.readFile('./public/index.html', null, function(err, data) {
    if(err) {
        res.writeHead(404);
        res.write('File not found');
    } else {
        res.write(data);
    }
    res.end();
   });
}

//call express and db user+pwd
const app = express();
require('dotenv/config');

//routes
app.get('/', (req,res) => {
    res.send('We are on Home')
});

//db connect
mongoose.connect(
    process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});



//listen for server 

http.createServer(onRequest).listen(3000, '127.0.0.1');
console.log('Yo! you are on port 3000');