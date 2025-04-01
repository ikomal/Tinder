
const mongoose=require("mongoose");

const database=async()=>{
    await mongoose.connect(
        "mongodb+srv://sharmakomal3512:Un2b1ivAHEDWW4v6@cluster0.isbbogz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
}
module.exports=database;
