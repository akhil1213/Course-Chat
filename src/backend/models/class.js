const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    courseName:{
        type: String,
        required: true
    },
    profName:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required:true
    },
});
//if we don't export, we can't import.
module.exports = Class = mongoose.model('class', ClassSchema);//now we can bring this model into other files.