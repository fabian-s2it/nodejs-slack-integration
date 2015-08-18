var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var palavraSchema = new Schema({
    nome : String,
    traducao : String,
    user_name : String
});

module.exports = mongoose.model('Palavra', palavraSchema)