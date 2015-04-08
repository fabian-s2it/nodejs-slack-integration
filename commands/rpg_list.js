var tools = require('./../tools').Tools;
var constants = require('./../constants');

var rpg_list = function () {};


rpg_list.prototype.run = function(req) {
    tools.logger('entered on /rpg_list');
    text = 'Player list:';
    channel_id = req.body.channel_id;

    for (var x = 0; x < players.length; x++) {
        text = text + '\n' + players[x].nickname;
    }

    botPayload = tools.createPayload(constants.BOT_USERNAME, constants.BOT_ICON_EMOJI, text, channel_id, '');

    return botPayload;
};

exports.rpg_list = new rpg_list();
