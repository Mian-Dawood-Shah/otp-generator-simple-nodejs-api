import User from "../models/User.js";

class UserController{

    static createUser = async (req,res)=>{
       try {
        const {name,phone_no} = req.body;
        if(name && phone_no){
            const createuserDoc = User({
                name:name,
                phone_no:phone_no,
            })
            const userData = await createuserDoc.save();
            res.status(201).json({success:true,data:userData,error:null})
        }else{
            res.status(400).json({success:false,message:"Name & Phone No Required"})
        }
    }
    catch (error) {
        res.status(404).json({success:true,error:error.message})
       }
    }

    static generateOtp = async (req, res) => {
        try {
          const { phone_no } = req.body;
          const extUser = await User.findOne({ phone_no: phone_no });
          if(extUser){
          const currentDateTime = new Date();
          const valotp = Math.floor(1000 + Math.random() * 9000);
          extUser.otp = valotp;
          extUser.otp_expiration_date = new Date(currentDateTime.getTime() + 1 * 60 * 1000);
          const extUserData = await extUser.save();
          res.status(201).json({ success: true, userId: extUserData._id, error: null });
          }
          else{
            res.status(201).json({ success: true, message:"Error Otp Is Not Generated"});
          }
        } catch (error) {
          res.status(500).json({ success: false, message: "Otp Not Saved", error: error.message });
        }
      }
      

    static verifyOtpBySingleId = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const currentDateTime = new Date();
            if (user.otp_expiration_date > currentDateTime) {
                res.status(200).json({ success: true,data:user,error:null });
            }else{
                res.status(200).json({ success: false, message: "Token Expired" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Error In Verifying Otp", error: error.message });
        }
    }

    static errorPage = (req,res)=>{
        res.status(404).json({success:false,message:"Error 404...! Route Does Not Exist"});
    }
}

export default UserController
