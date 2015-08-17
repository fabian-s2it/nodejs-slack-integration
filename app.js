var express = require('express');
var bodyParser = require('body-parser');



//using globals instead of mongodb + redis
global.players = [];

var hellobot = require('./hellobot');
var dicebot = require('./dicebot');
var rpgbot = require('./rpgbot');
var dicionariobot = require('./dicionariobot');
var 
 
var app = express();
var port = process.env.PORT || 3000;



 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

app.post('/hello', hellobot);
app.post('/rpg', rpgbot);
app.post('/roll', dicebot);
app.post('/dicionario', dicionariobot);

 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});