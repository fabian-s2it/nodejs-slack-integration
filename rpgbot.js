var request = require('request');

module.exports = function (req, res, next) {

  //var players = [];
  var botPayload = {};
  var NICKNAME_POS = 0;
  var CLASS_POS = 1;

  var BOT_USERNAME = 'RPG Bot';
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

        parameters = req.body.text.split(" ");

        var player = {};
        player.user_id = req.body.user_id;
        player.user_name = req.body.user_name;
        player.nickname = parameters[NICKNAME_POS];
        player.player_class = parameters[CLASS_POS];
        player.state = STATE_STATS_WAITING;
        
        console.log(player);
        players.push(player);


        text = req.body.user_name + ' created a new hero: ' + player.nickname + ' ['+ player.player_class +'].\n';
        text = text + 'Now, use /rpg_hero_stats [str] [int] [agi] to set your hero initial points.\n';
        text = text + 'Remember: You have only 7 points!';
        channel_id = req.body.channel_id;

        botPayload = createPayload(BOT_USERNAME, BOT_ICON_EMOJI, text, channel_id);
    }
    else if (req.body.command == '/rpg_list') {

        //Implementar REDIS aqui pra não dar overhead no banco

        console.log('entered on /rpg_list');
        text = 'Player list:';
        channel_id = req.body.channel_id; 

        for (var x = 0; x < players.length; x++) {
          text = '\n' + players[x].nickname;
        }

        botPayload = createPayload(BOT_USERNAME, BOT_ICON_EMOJI, text, channel_id);

    }
    else if (req.body.command == '/rpg_hero_stats') {

        parameters = req.body.text.split(" ");

        player_array_pos = findPlayerByUserID(req.body.user_id);

        players[player_array_pos].str = parameters[0];
        players[player_array_pos].intel = parameters[1];
        players[player_array_pos].agi = parameters[2];


        channel_id = req.body.channel_id;

        botPayload = createPayload(BOT_USERNAME, BOT_ICON_EMOJI, heroLayout(), channel_id);

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

}


function roll (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPayload(bot_name, bot_emoji, text, channel_id) {
    payload = {}

    payload.username = bot_name;
    payload.bot_emoji = bot_emoji;
    payload.text = text;
    payload.channel_id = channel_id;

    return payload;
}


function findPlayerByUserID(user_id) {

    for (var x = 0; x < players.length; x++) {
      if (players[x].user_id == user_id) {
        return x;
      }

      return null;
    }

}


function heroLayout() {

  payloadtext = {
      "text": '',
      "attachments": [
          {
              "fallback": "ReferenceError - UI is not definied: https://honeybadger.io/path/to/event/",
              "text": "<https://honeybadger.io/path/to/event/|ReferenceError> - UI is not defined",
              "fields": [
                  {
                      "title": "Project",
                      "value": "Awesome Project",
                      "short": true
                  },
                  {
                      "title": "Environment",
                      "value": "production",
                      "short": true
                  }
              ],
              "color": "#F35A00"
          }
      ]
  }

  return payloadtext;


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