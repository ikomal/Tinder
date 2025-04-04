const mongoose=require("mongoose");
const validator=require('validator');
const { default: isEmail } = require("validator/lib/isEmail");

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

module.exports=mongoose.model("User",userSchema);