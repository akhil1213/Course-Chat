const express = require('express');
//const bodyParser = require("body-parser");//You need to use bodyParser() if you 
const router = express.Router();

// Item Model
const Class = require('../../models/class');
const auth = require("../../middleware/auth")

// @route GET api/items
//@desc Get all items
// @access public

router.get("/", (req,res) => {
    Class.find()
        .then(items => res.json(items));
});
router.get("/:username", auth, (req,res) => {
    console.log(req.params.username)
    Class.find({ username:req.params.username})
        .then(items => res.json(items));
});
router.get("/course/:id",auth, (req,res) => {
    // console.log(req.params.username)
    Class.find({ _id:req.params.id})
        .then(classInfo => {
            console.log(classInfo[0])
            classInfo = classInfo[0]
            Class.find({courseName:classInfo.courseName, profName:classInfo.profName, time:classInfo.time})
                .then(usersInClass =>{
                    res.json(usersInClass)
                })
        });
});
//select * from classes where username = "StudentA's username"
// @route POST api/items
//@desc Create a post
// @access public

// courseName:{
//     type: String,
//     required: true
// },
// profName:{
//     type: String,
//     required: true
// },
// time:{
//     type:String,
//     required: true,
// },
router.post("/", auth, (req,res) => {
    console.log("post worked!s")
    const newClass = new Class({
        courseName: req.body.courseName,
        profName:req.body.profName,
        time:req.body.time,
        username:req.body.username
    });
    newClass.save().then(item => res.json(item));
})

// @route DELETE api/items
//@desc Delete a post
// @access public
//what if somebody drops a class
//we probably arent even going to ues cuny first so whatever
router.delete("/:id",auth,(req,res) => {
    Class.findByIdAndRemove({ _id:req.params.id }, (err,data) => {
        console.log(err);
    })
})//if user gives wrong id we catch error

// @route update api/items
//@desc update a post
// @access public
//maybe they swapped professors!
router.put("/:id",auth, (req,res) => {
    const newClass = new Class({
        courseName: req.body.courseName,
        profName:req.body.profName,
        time:req.body.time,
        username:req.body.username
    });
    Class.findByIdAndUpdate({_id: req.params.id}, {$set: {newClass}}, (err) => {
        if (err) return res.json({ success: false, error: err });//using postman 
        return res.json({ success: true });//used postman to check if current route worked properly
    });
})//if user gives wrong id we catch error
module.exports = router;//no other file will be able to read whats in here without this