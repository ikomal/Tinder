const mongoose=require("mongoose");

const adminSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    password:{
        type:String,
    }
})

module.exports=mongoose.model("Admin",adminSchema);