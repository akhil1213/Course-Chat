var express = require("express");
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
// var cors = require('cors');
app.use(bodyParser.json());
// app.use(cors());
mongoose.connect('mongodb+srv://akhil:akhil123@cluster0-ucvbp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify:false}).then(()=>{
    console.log("worked");
}).catch(err => {
    console.log(err);
})
const routes = require('./routes/api/classes')
app.use('/', routes);
app.listen(5000, function(){
    console.log("course chat working server");
});