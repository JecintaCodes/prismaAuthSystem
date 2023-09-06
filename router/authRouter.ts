import { Router } from "express";
import { changePasswordUser, deleteAccount, readOneUsers, readUsers, registerUser, resetUser, signInUser, updateAccontInfo, updateImage, verifiedUser } from "../controller/authController";
import validatorHandling from "../utils/validatorHandling";
import { createUserValidator } from "../utils/validators";
import { upload } from "../utils/multer";

const authRouter = Router();

authRouter.route("/register").post(validatorHandling(createUserValidator), registerUser)

authRouter.route("/sign-in").post(signInUser)

authRouter.route("/userID/update").post(updateAccontInfo)

authRouter.route("/read-users").get(readUsers)

authRouter.route("/userID/read-one-user").get(readOneUsers)

authRouter.route("/userID/update-image").patch(upload,updateImage)

authRouter.route("/reset").patch(resetUser)

authRouter.route("/:token/userID/verify").patch(verifiedUser)

authRouter.route("/:token/change").patch(changePasswordUser)

authRouter.route("/userID/change").delete(deleteAccount)

export default authRouter