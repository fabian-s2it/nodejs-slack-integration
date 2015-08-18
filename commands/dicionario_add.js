var tools = require('./../tools').Tools;
var constants = require('./../constants');
var request = require('request');
var mongoose = require('mongoose');
var Palavra = mongoose.model('Palavra');

var dicionario_add = function () {};

dicionario_add.prototype.run = function(req, res) {

    nome = req.body.text.split(" ")[constants.PALAVRA_NOME];
    texto = req.body.text;
    var text = 'Erro';

    var traducao = texto.substring(texto.indexOf('"')+1, texto.lastIndexOf('"')); 

    var palavra = {};
    palavra.user_id = req.body.user_id;
    palavra.user_name = req.body.user_name;
    palavra.nome = nome;
    palavra.traducao = traducao;

    var palavra_add = new Palavra({
        nome: palavra.nome,
        traducao: palavra.traducao,
        user_name: palavra.user_name
    });

    Palavra.findOne(
    {nome: palavra.nome}, function(err, pal){

        if (err) {
            palavra_add.save(function (err, data) {
                if (err) {
                    console.log(err);
                    text = 'Erro ao adicionar palavra; ' + err;
                } 
                else {
                    console.log('Saved : ', data );
                    text = 'Palavra adicionada com sucesso: \n'
                    text += '*'+palavra.nome + '*: ' + palavra.traducao;
                } 
            });
        }
        else {
            text = 'Essa palavra já existe \n';
            text = text + '*' + pal.nome + '*: ' + pal.traducao;
        }

        channel_id = req.body.channel_id;

        botPayload = tools.createPayload(constants.BOT_DICIONARIO_USERNAME, constants.BOT_DICIONARIO_EMOJI, text, channel_id, '');
        console.log(botPayload);    
        
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
};


exports.dicionario_add = new dicionario_add();
