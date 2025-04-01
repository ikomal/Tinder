const express = require("express");
const app = express();
const User=require("./models/user")

const database=require("./config/database")

app.post("/signup",async(req,res)=>{
  //creating instance of model user
  const user=new User({
  firstName:"komal",
  lastName:"sharma",
  age:"22",
  emailId:"komal@gmail.com",
  password:"komal@123"

  })
  try
  {await user.save();
  res.send("user added successfully");}
  catch(err)
  {
    res.status(400).send("error saving the user"+err.message)
  }



});

database()
.then(()=>{
    console.log("databse connceted");
})
.catch((err)=>{
    console.log("cannot connect to database");
});

app.listen(7000, () => {
  console.log("server started");
});
