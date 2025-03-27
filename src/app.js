const express=require("express");
const app=express();

app.use("/komal",(req,res)=>{
    res.send("hello from komal")
})
app.use((req,res)=>{
    res.send("hello from server")
})
app.use("/list",(req,res)=>{
    res.send("hello from list")

})


app.listen(7000,()=>{
    console.log("server started");
})