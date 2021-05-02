const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const Twit = require('twit');
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc');
const route = require('./routes/routes')


var route2 = express.Router();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.set( 'port', process.env.PORT || 3001 );



app.use('/testing',route);






http.createServer( app ).listen( app.get( 'port' ), function (){

console.log( 'Express server listening on port ' + app.get( 'port' ));
});

