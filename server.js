const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

//call express and db user+pwd (secured)
const app = express();
require('dotenv/config');

//routes
// const mainRouter = require('./src/routes/main')

// app.use('/', mainRouter);

//link html to server
function onRequest(req,res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   fs.readFile('./src/views/main.ejs', 'Utf8', function(err, data) {
    if(err) {
        res.writeHead(404);
        res.write('File not found');
    } else {
        res.write(data);
    }
    res.end();
   });
}

// middleware // call static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname, + 'public/css'))
app.use('/js', express.static(__dirname, + 'public/js'))

//set template engine 
app.set('views', '.src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended : true }))

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