const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
userRouter.post("/register",async(req,res)=>{
    try {
        const {password}=req.body
        bcrypt.hash(password, 5,async function(err, hash) {
            const user=await new UserModel({...req.body,password:hash})
            user.save()
            res.status(200).send({"msg":"Registration successful"})
        });
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await UserModel.findOne({email})
        if(!user){
            res.status(200).send({"msg":"Registred first,Login failed"})
            
        }else{
            bcrypt.compare(password, user.password, async function(err, result) {
                if(result){
                    var token = jwt.sign({ foo: 'bar' }, 'emi');                    
                    res.status(200).send({"msg":"Login successfull",token,user})
                }else{
                   res.status(200).send({"msg":"Wrong Password"})

               }
            });
        }
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

module.exports={userRouter}