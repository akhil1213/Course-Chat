const express = require('express');
//const bodyParser = require("body-parser");//You need to use bodyParser() if you 
const router = express.Router();

// Item Model
const Message = require('../../models/message');
const auth = require("../../middleware/auth")

// @route GET api/messages 
//@desc Get all messages for a certain user in ascending order so from earliest date to highest date
// @access public .. should be private will use auth later.
router.get("/:user", (req,res) => {
    const username = req.params.user
    console.log(username)
    Message.find({ $or: [ { from: username }, { to: username } ] })//if the message is from the current user or to the current user.
    .sort({"created_at":1})
    .then(messages => {
        console.log(messages)
        res.json(messages)
    });
});

//@desc get all the chatters, so first get all the messages and then get all unique messages so 'from' and 'to' have to be unique. then convert into array and return array as json
router.get("/:user/chatters", (req,res) => {
    const username = req.params.user
    let allChatters = []
    Message.find({ $or: [ { from: username }, { to: username } ] })
    .distinct("from").then(fromChatters =>{//get all the unique messages from people 
        Object.values(fromChatters).map(function(val) {
            allChatters.push(val)
        });
    })
    Message.find({ $or: [ { from: username }, { to: username } ] })
    .distinct("to").then(toChatters =>{//get all unique messages sent to people so all the unique people i sent messages to.
        Object.values(toChatters).map(function(val) {
            allChatters.push(val)
        });
        res.json(allChatters)
    })
});

router.post("/",  (req,res) => {

    console.log(req.body)
    const newMessage = new Message({
        from: req.body.from,
        to:req.body.to,
        message:req.body.message,
    });
    newMessage.save().then(item => res.json(item));
})

module.exports = router;