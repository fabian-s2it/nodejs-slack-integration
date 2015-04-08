var tools = require('./../tools').Tools;
var constants = require('./../constants');

var rpg_hero_stats = function () {};


rpg_hero_stats.prototype.run = function(req) {

    parameters = req.body.text.split(" ");

    tools.logger('Trying to find player');
    tools.logger('User_id: ' + req.body.user_id);

    player_array_pos = tools.findPlayerByUserID(req.body.user_id);

    tools.logger('Player array pos: ' + player_array_pos);

    if (player_array_pos != null) {
        players[player_array_pos].str = parameters[0];
        players[player_array_pos].intel = parameters[1];
        players[player_array_pos].agi = parameters[2];
    }
    else {
        return null;
    }

    channel_id = req.body.channel_id;
    text = players[player_array_pos].user_name + ' requested:\n';

    botPayload = createPayload(constants.BOT_USERNAME, constants.BOT_ICON_EMOJI, text, channel_id, heroLayout(players[player_array_pos]));

    return botPayload;
};

function heroLayout(player) {

    attachments = [
        {
            "fallback": "Hero Stats",
            "text": player.nickname + " Stats:\n",
            "fields": [
                {
                    "title": "STR",
                    "value": player.str,
                    "short": true
                },
                {
                    "title": "INT",
                    "value": player.intel,
                    "short": true
                },
                {
                    "title": "AGI",
                    "value": player.agi,
                    "short": true
                }
            ],
            "color": "#F35A00"
        }
    ];

    return attachments;
}

exports.rpg_hero_stats = new rpg_hero_stats();
