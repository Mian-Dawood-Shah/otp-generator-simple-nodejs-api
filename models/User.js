import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String,trim:true},
    phone_no:{type:Number,unique:true},
    otp:{type:String,unique:true,trim:true},
    otp_expiration_date:{type:Date,default: Date.now()}
})
const User = mongoose.model("user",userSchema);

export default User;


