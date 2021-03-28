const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookgSchema = new mongoose.Schema({
    bedid: {type:String,unique:true,required: true},
    user: {type:String}
});

const bookg = mongoose.model('bookg', bookgSchema);
module.exports = bookg
