const express=require("express");
const app=express();

app.use("/user",(req,res)=>{
    res.send("hello from server")
})
app.get("/user",(req,res)=>{
    res.send("enter the details")

})

app.post("/user",(req,res)=>{
    res.send("data saved successfully")
})
app.use((req,res)=>{
    res.send("hello from server")
})


app.listen(7000,()=>{
    console.log("server started");
})