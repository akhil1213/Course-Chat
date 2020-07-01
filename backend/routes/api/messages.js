const express = require('express');
//const bodyParser = require("body-parser");//You need to use bodyParser() if you 
const router = express.Router();

// Item Model
const Message = require('../../models/Message');
const auth = require("../../middleware/auth")

// @route GET api/messages 
//@desc Get all messages for a certain user in ascending order so from earliest date to highest date
// @access public .. should be private will use auth later.
router.get("/:user", (req,res) => {
    const username = req.params.user
    console.log(username)
    Message.find({ $or: [ { from: username }, { to: username } ] })
    .sort({"created_at":1})
    .then(messages => {
        console.log(messages)
        res.json(messages)
    });
});
router.get("/:user/chatters", (req,res) => {
    const username = req.params.user
    let allChatters = []
    Message.find({ $or: [ { from: username }, { to: username } ] })
    .distinct("from").then(fromChatters =>{
        Object.values(fromChatters).map(function(val) {
            allChatters.push(val)
        });
    })
    Message.find({ $or: [ { from: username }, { to: username } ] })
    .distinct("to").then(toChatters =>{
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