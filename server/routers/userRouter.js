import express from 'express';
import {register, login, getAllUsers, checkUser, getOneUser, updateUserProfil, deleteOneUser, updateUserStatus, resetUserPassword} from '../controllers/userController.js'
import {isAuthorized, isLogged} from '../middlewares/auth.js'
import uploadProfilPicture from '../middlewares/profilPictureMulter.js'


const userRouter = express.Router();

// ROUTES
userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/getall", isLogged, isAuthorized(["admin"]), getAllUsers)
userRouter.get("/getone/:id", isLogged, getOneUser)
userRouter.delete("/deleteone/:id", isLogged, isAuthorized(["admin"]), deleteOneUser)
userRouter.put("/updatestatus/:id", isLogged, isAuthorized(["admin"]), updateUserStatus)
userRouter.put("/resetpassword/:id", isLogged, resetUserPassword)
userRouter.put("/updateprofil", isLogged, uploadProfilPicture.single("profilPicture"), updateUserProfil)
userRouter.get("/check", isLogged, checkUser)

export default userRouter