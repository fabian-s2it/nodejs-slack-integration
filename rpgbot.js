var request = require('request');
var tools = require('./tools').Tools;
var rpg_list = require('./commands/rpg_list').rpg_list;
var rpg_create = require('./commands/rpg_create').rpg_create;
var rpg_hero_stats = require('./commands/rpg_hero_stats').rpg_hero_stats;


module.exports = function (req, res, next) {


    //var players = [];
    var botPayload = {};
    var NICKNAME_POS = 0;
    var CLASS_POS = 1;

    var BOT_USERNAME = 'BoardGame Bot';
    var BOT_ICON_EMOJI = ':game_die:';


    var STATE_STATS_WAITING = 1;
    var STATE_STATS_DONE = 2;


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

    if (req.body.text != 'error') {

        console.log('COMMAND: ' + req.body.command);

        if (req.body.command == '/rpg_create') {

            botPayload = rpg_create.run(req);

        }
        else if (req.body.command == '/rpg_list') {

            //Implementar REDIS aqui pra não dar overhead no banco
            botPayload = rpg_list.run(req);

        }
        else if (req.body.command == '/rpg_hero_stats') {

            botPayload = rpg_hero_stats.run(req);

        }
    }

    send(botPayload, function (error, status, body) {
        if (error) {
            return next(error);

        } else if (status !== 200) {
            // inform user that our Incoming WebHook failed
            return next(new Error('Incoming WebHook: ' + status + ' ' + body));

        } else {
            return res.status(200).end();
        }
    });

}


function roll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPayload(bot_name, bot_emoji, text, channel_id, attachments) {
    payload = {};

    payload.username = bot_name;
    payload.icon_emoji = bot_emoji;
    payload.text = text;
    payload.channel_id = channel_id;
    payload.attachments = attachments;

    return payload;
}







function send(payload, callback) {
    var uri = 'https://hooks.slack.com/services/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';

    request({
        uri: uri,
        method: 'POST',
        body: JSON.stringify(payload)
    }, function (error, response, body) {
        if (error) {
            return callback(error);
        }

        callback(null, response.statusCode, body);
    });
}