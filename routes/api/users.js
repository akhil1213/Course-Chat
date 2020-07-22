const express = require("express");
// const { check, validationResult} = requi÷re("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");
const auth = require("../../middleware/auth")
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    async (req, res) => {

        const {
            fullName,
            username,
            email,
            password,
            college,
        } = req.body;
        try {
            //unique username and email! so check both username and email.
            let user = await User.findOne({
                username
            });
            let emailcheck = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "Username is taken"
                });
            }else if(emailcheck){
                return res.status(400).json({
                    msg: "Email is taken"
                });
            }
            user = new User({
                username,
                email,
                password,
                fullName,
                college
            });
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                id: user.id
            };

            jwt.sign(
                payload,
                "akhil_loves_coding!", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'User created successfully!',
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);
router.post(
    "/login",
    async (req, res) => {
        const {
            username,
            password,
        } = req.body;
        console.log(username)
        console.log(password)
        let user_;
        User.findOne({username})
            .then(user => {
                if(!user) {
                    return res.status(401).json({
                    message: "Wrong username"
                    });
                }
                user_ = user;
                return bcrypt.compare(password, user_.password);
                })
            .then(result => {
                if(!result) {
                    console.log("wrong password")
                    return res.status(401).json({
                    message: "Wrong password"
                    });
                } else {
                    console.log("your auth!")
                    const payload = {
                        id: user_.id
                    };
                    jwt.sign(
                        payload,
                        "akhil_loves_coding!", {
                            expiresIn: 100000
                        },
                        (err, token) => {
                            console.log(err)
                            if (err) {
                                console.log(err)
                            }else{
                                console.log("ayyay")
                            }
                            res.status(200).json({
                                message: 'User logged in heres ur token!',
                                token
                            });
                        }
                    );
                }
            })
            .catch(error => {
                return res.status(401).json({
                    message: "Authentication failed!"
                });
            });
        }
);
router.get('/get/user',auth,(req,res)=>{
    User.find({_id: req.user.id})
        .select('-password')
        .then(user => {
            res.json(user)
            console.log(user)
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                message:'No token'
            })
        });
})
module.exports = router;