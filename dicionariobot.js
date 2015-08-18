var request = require('request');
var dicionario_add = require('./commands/dicionario_add').dicionario_add;
// var rpg_create = require('./commands/rpg_create').rpg_create;
// var rpg_hero_stats = require('./commands/rpg_hero_stats').rpg_hero_stats;

module.exports = function (req, res, next) {

    var botPayload = {};
    var command = req.body.command;
    /*
    token=gIkuvaNzQIHg97ATvDxqgjtO
    team_id=T0001
    team_domain=example
    channel_id=C2147483705
    channel_name=test
    user_id=U2147483697
    user_name=Steve
    command=/weather
    text=94070
    */


    console.log('COMMAND: ' + command);


    if (command == 'dicionario_add') {
        botPayload = dicionario_add.run(req, res);
    }


};
    




    