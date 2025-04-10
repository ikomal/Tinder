
const express=require('express');
const reqRouter=express.Router();
const {userAuth} = require("../middlewares/auth");


reqRouter.post("/sendconnection",userAuth,async(req,res)=>{
    const user=req.user;
    res.send(user.firstName+" has sent connection request");
  })

module.exports=reqRouter;