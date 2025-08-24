const router=require("express").Router();
const User=require("../models/User.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {registerUser,loginUser}=require("../controllers/user.controllers");


router.post("/register",(req,res)=>registerUser(req,res));

router.post("/login",(req,res)=>loginUser(req,res));


module.exports = router;