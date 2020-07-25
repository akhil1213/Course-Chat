const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb+srv://akhil:akhil123@cluster0-ucvbp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify:false}).then(()=>{
    console.log("worked");
}).catch(err => {
    console.log(err);
})
const classRoutes = require('./routes/api/classes')
const userRoutes = require('./routes/api/users')
const messageRoutes = require('./routes/api/messages')
app.use('/', classRoutes);
app.use('/', userRoutes);
app.use('/messages/', messageRoutes)
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.listen(process.env.PORT || 5000, function(){
    console.log("course chat working server");
});