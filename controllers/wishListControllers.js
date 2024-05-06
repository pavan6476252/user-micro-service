import axios from "axios";
import UserModel from "../model/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import httpsStatusCodes from "../utils/httpStatusCodes.js";
import { PRODUCTS_BASEURL } from "../services/BaseURls.js";

export const getWishlist = async (req, res) => {
  const uid = req.uid;

  const userResponse = await UserModel.findOne({ uid });

  // request the products in the wishlist from the `Products` service

  const { data } = await axios.get(`${PRODUCTS_BASEURL}/products/arr`, {
    arr: userResponse.wishList,
  });

  // respond with all products
  const response = new ApiResponse(httpsStatusCodes.OK, data, "Success");
  res.status(httpsStatusCodes.OK).json(response);
};

export const updateWishlist = async (req, res) => {
  const { productId } = req.prams;
  const uid = req.uid;

  const user = await UserModel.findOne({ uid });
  if (!user) throw new Error("User not found");

  const wishlist = user.wishList || [];

  // if the wishlist contains the item, remove it
  let newWishlist = [];
  if (wishlist.includes(productId))
    newWishlist = wishlist.filter((item) => item !== productId);
  // else add it to the wishlist
  else newWishlist = [...wishlist, productId];

  // update the database with the new wishlist
  await UserModel.findOneAndUpdate({ uid }, { $set: { wishList: newWishlist } });

  const resposne = new ApiResponse(
    httpsStatusCodes.OK,
    null,
    "Updated Successfully"
  );

  return res.json(resposne);
};
