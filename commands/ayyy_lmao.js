var tools = require('./../tools').Tools;
var constants = require('./../constants');

var ayyy_lmao = function () {};

ayyy_lmao.prototype.run = function(req) {

    channel_id = req.body.channel_id;

    text = '░░░░░░▄▀▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒█\n'
            +'░░░░░█▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█\n'
            +'░░░░█▒▒▄▀▀▀▀▀▄▄▒▒▒▒▒▒▒▒▒▄▄▀▀▀▀▀▀▄\n'
            +'░░▄▀▒▒▒▄█████▄▒█▒▒▒▒▒▒▒█▒▄█████▄▒█\n'
            +'░█▒▒▒▒▐██▄████▌▒█▒▒▒▒▒█▒▐██▄████▌▒█\n'
            +'▀▒▒▒▒▒▒▀█████▀▒▒█▒░▄▒▄█▒▒▀█████▀▒▒▒█\n'
            +'▒▒▐▒▒▒░░░░▒▒▒▒▒█▒░▒▒▀▒▒█▒▒▒▒▒▒▒▒▒▒▒▒█\n'
            +'▒▌▒▒▒░░░▒▒▒▒▒▄▀▒░▒▄█▄█▄▒▀▄▒▒▒▒▒▒▒▒▒▒▒▌\n'
            +'▒▌▒▒▒▒░▒▒▒▒▒▒▀▄▒▒█▌▌▌▌▌█▄▀▒▒▒▒▒▒▒▒▒▒▒▐\n'
            +'▒▐▒▒▒▒▒▒▒▒▒▒▒▒▒▌▒▒▀███▀▒▌▒▒▒▒▒▒▒▒▒▒▒▒▌\n'
            +'▀▀▄▒▒▒▒▒▒▒▒▒▒▒▌▒▒▒▒▒▒▒▒▒▐▒▒▒▒▒▒▒▒▒▒▒█\n'
            +'▀▄▒▀▄▒▒▒▒▒▒▒▒▐▒▒▒▒▒▒▒▒▒▄▄▄▄▒▒▒▒▒▒▄▄▀\n'
            +'▒▒▀▄▒▀▄▀▀▀▄▀▀▀▀▄▄▄▄▄▄▄▀░░░░▀▀▀▀▀▀\n'
            +'▒▒▒▒▀▄▐▒▒▒▒▒▒▒▒▒▒▒▒▒▐\n'
            +'░▄▄▄░░▄░░▄░▄░░▄░░▄░░░░▄▄░▄▄░░░▄▄▄░░░▄▄▄\n'
            +'█▄▄▄█░█▄▄█░█▄▄█░░█░░░█░░█░░█░█▄▄▄█░█░░░█\n'
            +'█░░░█░░█░░░░█░░░░█░░░█░░█░░█░█░░░█░█░░░█\n'
            +'▀░░░▀░░▀░░░░▀░░░░▀▀▀░░░░░░░░░▀░░░▀░▀▄▄▄▀\n';

    console.log(text);

    botPayload = tools.createPayload(constants.BOT_LMAO_USERNAME, constants.BOT_LMAO_EMOJI, text, channel_id, '');

    return botPayload;

};

exports.ayyy_lmao = new ayyy_lmao();
