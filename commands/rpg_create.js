var tools = require('./../tools').Tools;
var constants = require('./../constants');

var rpg_create = function () {};

rpg_create.prototype.run = function(req) {

    parameters = req.body.text.split(" ");

    var player = {};
    player.user_id = req.body.user_id;
    player.user_name = req.body.user_name;
    player.nickname = parameters[constants.NICKNAME_POS];
    player.player_class = parameters[constants.CLASS_POS];
    player.state = constants.STATE_STATS_WAITING;

    tools.logger(player);
    players.push(player);

    text = req.body.user_name + ' created a new hero: ' + player.nickname + ' [' + player.player_class + '].\n';
    text = text + 'Now, use /rpg_hero_stats [str] [int] [agi] to set your hero initial points.\n';
    text = text + 'Remember: You have only 7 points!\n';
    channel_id = req.body.channel_id;

    botPayload = tools.createPayload(constants.BOT_USERNAME, constants.BOT_ICON_EMOJI, text, channel_id, '');

    return botPayload;

};

exports.rpg_create = new rpg_create();
