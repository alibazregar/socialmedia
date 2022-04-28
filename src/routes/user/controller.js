const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Controller = require("../controller")
const User = require("./../../models/user")
module.exports = new(class extends Controller {

  async signIn(req,res){
    
    const {email,password} = req.body;
    const existingUser = await User.findOne({email})
    
    if(!existingUser) return res.status(404).json({message: "User dosen't exist."})
    
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
    
    if(!isPasswordCorrect) return res.status(400).json({message: "invalid credentials"})
    
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_KEY,{expiresIn:"100h"})
    res.status(200).json({result:existingUser,token})
  
  }

  async signUp(req,res){
  
    const {email,password,confirmPassword,firstName,lastName} = req.body
    
    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(404).json({message: "User already exists."})

    if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match "})
     
    const hashedPassword = await bcrypt.hash(password,12) 
    const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})

    const token = jwt.sign({email:result.email,id:result._id},process.env.JWT_KEY,{expiresIn:"100h" })
    res.status(200).json({result:result,token})
  }
 
})