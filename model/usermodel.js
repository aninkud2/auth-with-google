const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
firstname:{
    type:String,
  
},
lastname:{
    type:String,
 
    
},
password:{
    type:String,
    
},
email:{
    unique:true,
    type:String,
    }
},

{timestamps:true})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel