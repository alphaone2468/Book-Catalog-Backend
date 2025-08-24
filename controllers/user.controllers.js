const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function registerUser(req,res){
  try{
    
    if(!req.body?.name){
      return res.status(400).json({status:"FAILED",message:"Name is required"});
    }
    if(!req.body?.email){
      return res.status(400).json({status:"FAILED",message:"Email is required"});
    }
    if(!req.body?.password){
      return res.status(400).json({status:"FAILED",message:"Password is required"});
    }
    const {name,email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(409).json({status:"FAILED",message:"User Already Exist"});
    }

    const hashPassword = await bcrypt.hash(password,12);

    const newUser = new User({
      name,
      email,
      password: hashPassword
    });
    await newUser.save();

    return res.status(201).json({status:"SUCCESS",message:"User created Successfully"});
  } 
  catch(e){
    console.error(e);
    return res.status(500).json({status:"FAILED",message:"Internal Server Error"});
  } 
}



async function loginUser(req,res){
    try{

      if(!req.body.email){
        return res.status(400).json({status:"FAILED",message:"Email is required"})
      }
      if(!req.body.password){
        return res.status(400).json({status:"FAILED",message:"Password is required"})
      }
      
    const {email,password}=req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({status:"FAILED",message:"User Not Found"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({status:"FAILED",message:"Invalid Password"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"1h"
    });

    return res.status(200).json({status:"SUCCESS",message:"Login Successful",token});
  }
  catch(e){
    console.log(e);
    return res.status(500).json({status:"FAILED",message:"Internal Server Error"});
  }
}

module.exports = {
  registerUser,
  loginUser
};
