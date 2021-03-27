const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const bedSchema = new mongoose.Schema({
     // _id: mongoose.Types.ObjectId ,

    critLevel: {type:String,required: false , unique:false},
    pincode: {type:Number},
    hospital: {type:Boolean},
    tslot:{type:Boolean} ,
    status:{type:Boolean}

});

bedSchema.plugin(findOrCreate);
const bed = mongoose.model('bed', bedSchema);
module.exports = bed
