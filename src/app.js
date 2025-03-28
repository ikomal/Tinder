const express = require("express");
const app = express();

const {authorize}=require("./middlewares/auth")
app.use("/admin",authorize);


app.get("/admin/getdata",(req,res)=>{

  res.send("data collected successfully");
});

app.get("/admin/deleteuser",(req,res)=>{
  res.send("deleted user successfully");
})

//error handling
app.use("/",(err,req,res,next)=>{
  if (err)
  {res.status(500).send("something went wrong ji!!!!")}
});


app.listen(7000, () => {
  console.log("server started");
});
