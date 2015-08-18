var express = require('express');
var bodyParser = require('body-parser');

//using globals instead of mongodb + redis
global.players = [];

var hellobot = require('./hellobot');
var dicebot = require('./dicebot');
var rpgbot = require('./rpgbot');

 
var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Conectando no mongodb.');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('Conectado no mongodb');
});


require('./commands/palavra_schema');
mongoose.model('Palavra');
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

app.post('/hello', hellobot);
app.post('/rpg', rpgbot);
app.post('/roll', dicebot);

var dicionariobot = require('./dicionariobot');
app.post('/dicionario', dicionariobot);

 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});