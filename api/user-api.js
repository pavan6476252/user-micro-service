import { verifyToken } from "../middlewares/verifyToken.js";
import UserServices from "../services/user-services.js";
import express from "express";
import { newApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "../utils/httpStatusCodes.js";
import multerMiddleware from "../middlewares/multer.js";

export const userApi = () => {
  const router = express.Router();
  const service = new UserServices();

  router.get("/auto-create", verifyToken, async (req, res, next) => {
    try {
      const user = await service.autoCreateUser({ firebaseUser: req.fireUser });
      return newApiResponse(res, StatusCodes.OK, user, null);
    } catch (err) {
      next(err);
    }
  });

  router.get("/", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;

      const user = await service.getUser(uid);
      return newApiResponse(res, StatusCodes.OK, user, null);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    verifyToken,
    multerMiddleware.single("profileImage"),
    async (req, res, next) => {
      try {
        const uid = req.uid;

        const { firstName, lastName, email, phoneNumber, gender } = req.body;

        const user = await service.createUser({
          firstName,
          lastName,
          email,
          phoneNumber,
          gender,
          uid,
          file: req.file,
        });
        return newApiResponse(res, StatusCodes.OK, user, null);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/",
    verifyToken,
    multerMiddleware.single("profileImage"),
    async (req, res, next) => {
      try {
        const uid = req.uid;
        const { firstName, lastName, email, phoneNumber, gender } = req.body;

        const user = await service.editProfileInfo({
          firstName,
          lastName,
          email,
          phoneNumber,
          gender,
          uid,
          file: req.file,
        });
        return newApiResponse(res, StatusCodes.OK, user, null);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      return await service.deleteUser({ uid });
    } catch (e) {
      next(e);
    }
  });

  router.patch(
    "/pic",
    verifyToken,
    multerMiddleware.single("profileImage"),
    async (req, res, next) => {
      try {
        const file = req.file;
        const uid = req.uid;
        const user = await service.updateProfilePicture({ file, uid });
        return newApiResponse(res, StatusCodes.OK, user, null);
      } catch (e) {
        next(e);
      }
    }
  );
  router.delete(
    "/pic",
    verifyToken,

    async (req, res, next) => {
      try {
        const uid = req.uid;
        const { public_id } = req.body;
        await service.deleteProfilePicture({ uid, public_id });
        return newApiResponse(res, StatusCodes.OK, null, null);
      } catch (e) {
        next(e);
      }
    }
  );

  // address
  router.get("/address", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const addresses = await service.getAddresses(uid);
      return newApiResponse(res, StatusCodes.OK, addresses, null);
    } catch (e) {
      next(e);
    }
  });
  router.post("/address", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const {
        name,
        phoneNumber,
        pinCode,
        location,
        addressLine,
        locality,
        city,
        district,
        state,
        country,
      } = req.body;
      const addr = await service.addNewAddress({
        uid,
        name,
        phoneNumber,
        pinCode,
        location,
        addressLine,
        locality,
        city,
        district,
        state,
        country,
      });
      return newApiResponse(res, StatusCodes.OK, addr, null);
    } catch (e) {
      next(e);
    }
  });

  router.put("/address/:addressId", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const {
        addressId,
        name,
        phoneNumber,
        pinCode,
        location,
        addressLine,
        locality,
        city,
        district,
        state,
        country,
      } = req.body;
      const addr = await service.editAddress({
        addressId,
        name,
        phoneNumber,
        pinCode,
        location,
        addressLine,
        locality,
        city,
        district,
        state,
        country,
      });
      return newApiResponse(res, StatusCodes.OK, addr, null);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/address/:addressId", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const { addressId } = req.params;
      const addrs = await service.deleteAddress({ uid, addressId });
      return newApiResponse(res, StatusCodes.OK, addrs, null);
    } catch (e) {
      next(e);
    }
  });

  // preferences
  router.patch("/prefs/fcm", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const { type, token, device } = req.body;
      const prefs = await service.updateFCMToken({ uid, type, token, device });

      return newApiResponse(res, StatusCodes.OK, prefs, null);
    } catch (e) {
      next(e);
    }
  });

  //wishlist

  router.get("/wishlist", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const w_list = await service.getWishlist({ uid });

      return newApiResponse(res, StatusCodes.OK, w_list, null);
    } catch (e) {
      next(e);
    }
  });

  router.patch("/wishlist/:productId", verifyToken, async (req, res, next) => {
    try {
      const uid = req.uid;
      const { productId } = req.params;
      const w_list = await service.updateWishlist({ uid, productId });

      return newApiResponse(res, StatusCodes.OK, w_list, null);
    } catch (e) {
      next(e);
    }
  });

  return router;
};
