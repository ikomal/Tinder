const express = require("express");
const app = express();
const database = require("./config/database");

const User = require("./models/user");
const Admin = require("./models/admin");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
const authRouter=require('./routes/auth')
const profileRouter=require("./routes/profile");
const reqRouter=require("./routes/req");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",reqRouter);








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
