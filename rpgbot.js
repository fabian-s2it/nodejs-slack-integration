var request = require('request');



module.exports = function (req, res, next) {
  var players [];
  var botPayload = {};

  var NICKNAME_POS = 0;
  var CLASS_POS = 1;


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

  if (req.body.text != '') {
    // parse roll type if specified

    if (req.body.command == '/rpg_create') {

        parameters = req.body.text.split(" ");


        var player = {
          user_id: req.body.user_id,
          name: req.body.user_name,
          nickname: parameters[NICKNAME_POS],
          player_class: parameters[CLASS_POS]
        }

        console.log(player);

        players.push(player);

        botPayload.text = req.body.user_name + ' created a new hero: ' + player.nickname + '['+ player.player_class +']';
        botPayload.username = 'RPG Bot';
        botPayload.channel = req.body.channel_id;
        botPayload.icon_emoji = ':game_die:';
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


function roll (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function send (payload, callback) {
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