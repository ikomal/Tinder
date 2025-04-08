const express = require("express");
const app = express();
const database = require("./config/database");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Admin = require("./models/admin");
const { validatesignup } = require("./utils/validatesignup");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
      const token = user.getJWT();

      //add token to cookie
      res.cookie( token,{expires: new Date(Date.now()+ 1*3600000),httpOnly:true});
      res.send("Login successfull!!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendconnection",userAuth,async(req,res)=>{
  const user=req.user;
  res.send(user.firstName+" has sent connection request");
})

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});
app.post("/admin", async (req, res) => {
  const admin = new Admin(req.body);
  // {
  // firstName:"aditya",
  // lastName:"sharma",
  // password:"aditya123"
  // }
  try {
    await admin.save();
    res.send("admin data added");
  } catch (err) {
    res.status(400).send("error saving admin data");
  }
});

app.get("/user", async (req, res) => {
  const useremail = req.body.emailId;
  try {
    const users = await User.find({ emailId: useremail });

    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//get password using findone
app.get("/usersdata", async (req, res) => {
  const passwordadmin = req.body.password;
  try {
    const admins = await Admin.findOne({ password: passwordadmin });
    res.send(admins);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//delete admin data using
app.delete("/admindata", async (req, res) => {
  const adminid = req.body.userid;
  try {
    await Admin.findByIdAndDelete(adminid);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//updata data of user
app.patch("/signup/:userId", async (req, res) => {
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

database()
  .then(() => {
    console.log("databse connceted");
    app.listen(7000, () => {
      console.log("server started");
    });
  })

  .catch((err) => {
    console.log("cannot connect to database");
  });
