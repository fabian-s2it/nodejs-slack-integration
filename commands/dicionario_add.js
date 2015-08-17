var tools = require('./../tools').Tools;
var constants = require('./../constants');

var dicionario_add = function () {};

dicionario_add.prototype.run = function(req) {

    nome = req.body.text.split(" ")[constants.PALAVRA_NOME];
    texto = req.body.text;

    var traducao = texto.substring(texto.indexOf('"')+1, texto.lastIndexOf('"')); 

    var palavra = {};
    palavra.user_id = req.body.user_id;
    palavra.user_name = req.body.user_name;
    palavra.nome = nome;
    palavra.traducao = traducao;


    console.log('Conectando no mongodb.');

    var mongoose = require('mongoose');
    mongoose.connect(process.env.MONGOLAB_URI);
    var db = mongoose.connection;

    db.on('error', function (err) {
        console.log('connection error', err);
    });
    db.once('open', function () {
        console.log('Conectado no mongodb');
    });

    var Schema = mongoose.Schema;
        var palavraSchema = new Schema({
            nome : String,
            traducao : String,
            user_name : String
        });

    var Palavra = mongoose.model('Palavra', palavraSchema);


    var palavra_add = new Palavra({
        nome: palavra.nome,
        traducao: palavra.traducao,
        user_name: palavra.user_name
    });

    Palavra.findOne(
    {'nome': 'palavra.nome'}, 'nome traducao user_name', function(err, pal){

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
            text += '*'+pal.nome + '*: ' + pal.traducao;
        }

    })


    tools.logger(palavra);
    channel_id = req.body.channel_id;

    botPayload = tools.createPayload(constants.BOT_DICIONARIO_USERNAME, constants.BOT_DICIONARIO_EMOJI, text, channel_id, '');

    return botPayload;

};

exports.dicionario_add = new dicionario_add();
