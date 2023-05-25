import express from "express";
import UserController from "../controller/userController.js";
const router = express.Router();

router.post("/users",UserController.createUser);
router.post("/users/generateopt",UserController.generateOtp);
router.get("/users/:id/verifyotp",UserController.verifyOtpBySingleId);

router.use("*",UserController.errorPage)

export default router;