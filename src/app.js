const database = require("./config/database");

const express = require("express");
const app = express();
const User = require("./models/user");
const Admin = require("./models/admin");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating instance of model user
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
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
  const passwordadmin=req.body.password
  try {
    const admins = await Admin.findOne({password:passwordadmin});
    res.send(admins);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//delete admin data using
app.delete("/admindata",async(req,res)=>{
  const adminid=req.body.userid;
  try{
    await Admin.findByIdAndDelete(adminid);
    res.send("user deleted successfully");
    
  }catch (err) {
    res.status(404).send("something went wrong");
  }
})

//updata data of user
app.patch("/signup",async(req,res)=>{
   const data=req.body;
   const emailid=req.body.emailId;
   try{
    const user=await User.findByIdAndUpdate(emailid,data,{
      runValidators:true,
    })
    // console.log(user);
    res.send("user updated successfully");

   }catch (err) {
    res.status(404).send("updation failed "+ err.message);
  }
})






database()
  .then(() => {
    console.log("databse connceted");
  })
  .catch((err) => {
    console.log("cannot connect to database");
  });

app.listen(7000, () => {
  console.log("server started");
});
