var Tools = function () {};

Tools.prototype.generateRoomId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

Tools.prototype.logger = function(msg) {
    console.log('>>>> SLACK-INTEGRATION: ' + msg);
};

Tools.prototype.findPlayerByUserID = function(user_id) {
    for (var x = 0; x < players.length; x++) {
        if (players[x].user_id == user_id) {
            return x;
        }
    }

    return null;
};

Tools.prototype.createPayload = function(bot_name, bot_emoji, text, channel_id, attachments) {
    payload = {};

    payload.username = bot_name;
    payload.icon_emoji = bot_emoji;
    payload.text = text;
    payload.channel_id = channel_id;
    payload.attachments = attachments;

    return payload;
};

exports.Tools = new Tools();


