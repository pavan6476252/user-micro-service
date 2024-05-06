import express from "express";
import {
  deleteProfilePicture,
  deleteUser,
  createUser,
  editUser,
  getUser,
  updateProfilePicture,
  autoCreateUser,
} from "../controllers/userControllers.js";
import {
  addAdress,
  editAdress,
  deleteAdress,
  getAdresses,
} from "../controllers/addressControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multerMiddleware from "../middlewares/multer.js";
import { getWishlist, updateWishlist } from "../controllers/wishListControllers.js";
import { updateFcmToken, updateMailNotificationStatus, updateWhatsappNotificationStatus } from "../controllers/userPreferencesController.js";

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, getUser);
userRouter.post("/profile/auto-create", verifyToken, autoCreateUser);
userRouter.post(
  "/profile",
  verifyToken,
  multerMiddleware.single("profileImage"),
  createUser
);
userRouter.put("/profile", verifyToken, editUser);
userRouter.patch("/profile/pic", verifyToken, multerMiddleware.single("profileImage"), updateProfilePicture);
userRouter.delete("/profile/pic", verifyToken, deleteProfilePicture);
userRouter.delete("/", verifyToken, deleteUser);

// addresss
userRouter.get("/profile/address", verifyToken, getAdresses);
userRouter.post("/profile/address", verifyToken, addAdress);
userRouter.put("/profile/address/:addressId", verifyToken, editAdress);
userRouter.delete("/profile/address/:addressId", verifyToken, deleteAdress);

//wishlist
userRouter.get("/profile/wishlist", verifyToken, getWishlist);
userRouter.patch("/profile/wishlist/:productId", verifyToken, updateWishlist);


//user preferences

userRouter.patch('/preferences/fcm', verifyToken, updateFcmToken)
userRouter.patch('/preferences/status/whatsapp', verifyToken, updateWhatsappNotificationStatus)
userRouter.patch('/preferences/status/mail', verifyToken, updateMailNotificationStatus)

export default userRouter;
