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
router.get("/:username",  (req,res) => {
    console.log(req.params.username)
    Class.find({ username:req.params.username})
        .then(items => res.json(items));
});
router.get("/course/:id", (req,res) => {
    // console.log(req.params.username)
    Class.find({ _id:req.params.id})
        .then(classInfo => {
            console.log(classInfo[0])
            classInfo = classInfo[0]
            Class.find({courseName:classInfo.courseName, profName:classInfo.profName, time:classInfo.time})
                .then(usersInClass =>{
                    res.json(usersInClass)
                }).catch((err) => console.log(err))
        }).catch((err) => console.log(err));
});
//select * from classes where username = "StudentA's username"
// @route POST api/items
//@desc Create a new class
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
router.post("/",  (req,res) => {
    console.log("post worked!s")
    console.log(req.body)
    const newClass = new Class({
        courseName: req.body.courseName,
        profName:req.body.profName,
        time:req.body.time,
        username:req.body.username,
        nameOfUser:req.body.nameOfUser
    });
    newClass.save().then(item => res.json(item));
})

// @route DELETE api/items
//@desc Delete a post
// @access public
//what if somebody drops a class
//we probably arent even going to ues cuny first so whatever
router.delete("/:id",(req,res) => {
    console.log(req.params.id)
    Class.findByIdAndRemove({ _id:req.params.id }, (err,data) => {
        if (err) return res.json({success:false, error:err})
        return res.json({success:true})//must return over here, this caused a bug in the backend and i wasnt able to log in from the front end.
    })
})//if user gives wrong id we catch error

// @route update api/items
//@desc update a post
// @access public
//maybe they swapped professors!
router.put("/:id",(req,res) => {
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