
const express=require('express');
const profileRouter=express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const {validateEdit}=require("../utils/validatesignup")



profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
   if(!validateEdit(req)){
    throw new Error("Invalid Edit req")
   }
   const loggedinUser=req.user;
   Object.keys(req.body).forEach((key)=>(loggedinUser[key]=req.body[key]))
   await loggedinUser.save();

   res.send(`${loggedinUser.firstName},your profile updated successfully`)

  }catch(err)
  {
    res.status(404).send("ERROR: "+err.message)
  }
})


  module.exports=profileRouter;