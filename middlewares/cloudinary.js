import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret:
    process.env.CLOUDINARY_API_SECRET
});
export const CloudinaryFolder = "users";
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: CloudinaryFolder,
    });

    console.log("File is uploaded on cloudinary", result.url);
    // return result.secure_url;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAssetsFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadOnCloudinary;
