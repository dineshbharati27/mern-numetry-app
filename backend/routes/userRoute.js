import express from 'express'
import { registerUser, loginUser, userProfile } from '../controllers/userController.js';
import upload from '../middlerwares/multer.js';
import authUser from '../middlerwares/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", upload.single('profileImage'), registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", authUser, userProfile )

export default userRouter;