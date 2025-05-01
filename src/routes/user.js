const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connRequest = require("../models/connRequest");
const user_data = "firstName lastName age skills about";
const User = require("../models/user");

userRouter.get("/user/request/pending", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connreq = await connRequest
      .find({
        status: "interested",
        toReceiverid: loggedinUser._id,
      })
      .populate("fromSenderid", user_data);

    res.json({
      message: "Data fetched successfully",
      data: connreq,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connReq = await connRequest
      .find({
        $or: [
          { fromSenderid: loggedinUser, status: "accepted" },
          { toReceiverid: loggedinUser, status: "accepted" },
        ],
      })
      .populate("fromSenderid", user_data)
      .populate("toReceiverid", user_data);

    const data = connReq.map((row) => {
      if (loggedinUser._id.toString() === row.fromSenderid._id.toString()) {
        return row.toReceiverid;
      }
      return row.fromSenderid;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const page = parseInt(req.params.page) || 1;
    let limit = parseInt(req.params.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * 10;
    //connection of logged in either accept,ignored whatever
    const connections = await connRequest
      .find({
        $or: [
          { fromSenderid: loggedinUser._id },
          { toReceiverid: loggedinUser._id },
        ],
      })
      .select("fromSenderid toReceiverid");

    //connections which should not show in feed
    const hiddenconnection = new Set();
    connections.forEach((req) => {
      hiddenconnection.add(req.fromSenderid.toString());
      hiddenconnection.add(req.toReceiverid.toString());
    });
    console.log(hiddenconnection);

    //feed of loggedin User
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenconnection) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    })
      .select(user_data)
      .skip(skip)
      .limit(limit);

    res.json({data:user});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
