const express = require("express");
const app = express();
const User = require("./models/user");
const Admin = require("./models/admin");

const database = require("./config/database");
app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating instance of model user
  const user = new User({
    firstName: "komal",
    lastName: "sharma",
    age: "22",
    emailId: "komal@gmail.com",
    password: "komal@123",
  });
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
