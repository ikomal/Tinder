const mongoose=require("mongoose");
const validator=require('validator');
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        min:18,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("not valid email id :" + value);
            }
        }

    },
    password:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
        validate(value){
           if (!["male","female","others"].includes(value)){
            throw new Error("invalid gender data")
           } 
        }
    },
    skills:{
        type:[String],

    },
    about:{
        type:String,
        default:"about section about user",
    }
},{
    timestamps:true,
}
)
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"tinder@wesx890",{expiresIn:"7d"})
    return token;

}
userSchema.methods.validatePassword=async function(passwordinput){
    const user=this;
    const passwordHash=user.password;
    const isvalidpassword=await bcrypt.compare(passwordinput,passwordHash);
    return isvalidpassword;
}

module.exports=mongoose.model("User",userSchema);