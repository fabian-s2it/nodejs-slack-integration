var request = require('request');
var ayyy_lmao = require('./commands/ayy_lmao').ayy_lmao;

module.exports = function (req, res, next) {

    var botPayload = {};

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

        if (req.body.command == '/ayy_lmao') {

            botPayload = ayy_lmao.run(req);
            console.log(botPayload);
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

};

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