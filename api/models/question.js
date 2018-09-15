const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    text:String,
    choices:[{
    	 id:mongoose.Schema.Types.ObjectId,
         type:String
    }],
    answer:Number

});

module.exports = mongoose.model('Question', quesSchema);

