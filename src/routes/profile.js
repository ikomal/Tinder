
const express=require('express');
const userRouter=express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");



userRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});
userRouter.patch("/signup/:userId", async (req, res) => {
    const data = req.body;
    const emailid = req.body.emailId;
    const userid = req.params?.userId;
    try {
      const allowed_updates = ["gender", "about", "skills", "password", "age"];
  
      const isallowed = Object.keys(data).every((k) =>
        allowed_updates.includes(k)
      );
  
      if (!isallowed) {
        throw new Error("updation not allowed");
      }
  
      if (data?.skills.length > 5) {
        throw new Error("more than5 skills not allowed");
      }
      const user = await User.findByIdAndUpdate(userid, data, {
        runValidators: true,
      });
      // console.log(user);
      res.send("user updated successfully");
    } catch (err) {
      res.status(404).send("updation failed " + err.message);
    }
  });

  module.exports=userRouter;