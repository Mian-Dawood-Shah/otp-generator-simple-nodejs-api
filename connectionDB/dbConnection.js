import mongoose from "mongoose";


const DB_OPTIONS={
    dbName:"otpGenerator",
}

const ConnectionDB = async (DATABASE_URL)=>{
  try {
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Connection Established Successfully");
  } catch (error) {
    console.log(`Error Thrown ${error}`);
  }  
}
export default ConnectionDB;