const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookgSchema = new mongoose.Schema({
    dept: {type:String,unique:true,required: true},
    data: {type:String}
});

const bookg = mongoose.model('bookg', bookgSchema);
module.exports = bookg
