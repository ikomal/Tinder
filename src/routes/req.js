const express = require("express");
const reqRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connRequest = require("../models/connRequest");
const User = require("../models/user");


reqRouter.post(
  "/request/send/:status/:toReceiverid",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromSenderid = req.user._id;
      const toReceiverid = req.params.toReceiverid;
      const status = req.params.status;

      //should allow status for ingonre and intersted
      const allowedStatus=["ignored","interested"];
      if(!allowedStatus.includes(status))
      {
        return res.status(400).send("not valid status type")
      }

      //if already exist connrequest
      const existconnReq = await connRequest.findOne({
        $or: [
          {
            fromSenderid,
            toReceiverid,
          },
          {
            fromSenderid: toReceiverid,
            toReceiverid: fromSenderid,
          },
        ],
      });

      if(existconnReq){
        return res.status(400).send("connection req already exist");
      }
      // if sending to user who doest exist

      const toUser=await User.findById(toReceiverid);
      if(!toUser){
        res.status(404).json({
          message:"RECEIVER NOT FOUND",
        })
      } 

      //creating new instance of connrequest
      const reqData = new connRequest({
        toReceiverid,
        fromSenderid,
        status,
      });

      await reqData.save();
      res.json({
        message: `${user.firstName} send the connection request to ${toUser.firstName}`,
        reqData,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

reqRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const {status,requestId}=req.params;
    const loggedinUser=req.user;


    //validation of status
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"status is not valid"
      })
    }

    const connReq=await connRequest.findOne({
      toReceiverid:loggedinUser._id,
      status:"interested",
      _id:requestId

    });
    
    if(!connReq){
      return res.status(404).json({
        message:"Could not find request"
      })
    }
    connReq.status=status;
    const data= await connReq.save();
    res.json({message:"connection request "+status,data})


  }catch(err){
    res.status(404).json("ERROR: "+err.message);
  }
})

module.exports = reqRouter;
