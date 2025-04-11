const validator=require("validator");

const validatesignup=((req)=>{
    const {firstName,lastName,password,emailId,age}=req.body;

    if (!firstName || !lastName)
    {
        throw new Error("Name is not valid!!")
    } else if (firstName.length<4 || firstName.length>50)
    {
        throw new Error("Name should be between 4-50 character");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("Email id is not valid!");
    }
    // else if(!validator.isStrongPassword(password)){
    //     throw new Error("Please enter strong password");
         
    // }
    else if (age<18){
        throw new Error("Your age should be more than 18!");

    }
});

const validateEdit=(req)=>{
    const allowedEdits=["age","lastName","firstName","about","skills","password"];
    // const{firstName,lastNametName,age,password,skills,about}=req.body;
    const isEditallowed=Object.keys(req.body).every((field)=>{
        return allowedEdits.includes(field);
    })
    return isEditallowed;
}

module.exports={
    validatesignup,validateEdit
}