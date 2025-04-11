const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

const bcrypt = require("bcrypt");
const { validatesignup } = require("../utils/validatesignup");

const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validatesignup(req);

    //encryption of data using bcrypt
    const { firstName, lastName, password, emailId, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //creating instance of model user
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
      age,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!!");
    }
    const isvalidpassword = await user.validatePassword(password);
    if (!isvalidpassword) {
      throw new Error("Invalid Credentials!!");
    } else {
      //create a jwt token
      const token = await user.getJWT();

      //add token to cookie
      res.cookie("token", token,{expires: new Date(Date.now()+8*360000)});
      res.send("Login successfull!!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  });
  res.send("logout successfull");
});

module.exports = authRouter;
