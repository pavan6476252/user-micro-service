import UserModel from "../model/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import uploadOnCloudinary, {
  deleteAssetsFromCloudinary,
} from "../middlewares/cloudinary.js";
import {
  createUserPreferenceModel,
  deleteUserPreferenceModel,
} from "../utils/user_pref_utils.js";
import UserPreferencesModel from "../model/PreferencesModel.js";

export const getUser = async (req, res) => {
  const uid = req.uid;
  const userProfile = await UserModel.findOne({ uid }).populate("preferences");
  console.log(await UserPreferencesModel.findOne({ uid }));
  if (userProfile) {
    const response = new ApiResponse(httpStatusCodes.OK, userProfile);
    console.log(response);
    return res.json(response);
  } else {
    const response = new ApiResponse(
      httpStatusCodes.NOT_FOUND,
      null,
      "User Not Found"
    );
    return res.json(response);
  }
};
export const autoCreateUser = async (req, res) => {
  const fireUser = req.fireUser;
  const { firstName, lastName } = req.body;
  const pref = await createUserPreferenceModel(req.uid);
  const newUser = new UserModel({
    uid: fireUser.uid,
    firstName,
    lastName,
    email: fireUser.email,
    phoneNumber: fireUser.phone_number,
    preferences: pref._id,
  });

  await newUser.save();
  const response = new ApiResponse(
    httpStatusCodes.OK,
    newUser,
    "New User Created Successfully"
  );
  return res.json(response);
};

export const createUser = async (req, res) => {
  const uid = req.uid;

  const { firstName, lastName, email, phoneNumber, role, gender } = req.body;
  const profileImage = req.file;

  const user = await UserModel.findOne({ uid });
  if (user) {
    const response = new ApiResponse(
      httpStatusCodes.CONFLICT,
      null,
      "User Already Exists"
    );
    return res.json(response);
  }

  let profilePicture = {};
  if (profileImage.path) {
    const urlRes = await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"] = urlRes.secure_url;
    profilePicture["public_id"] = urlRes.public_id;
  }
  const pref = await createUserPreferenceModel(uid);
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    gender,
    profilePicture,
    preferences: pref._id,
  });

  await newUser.save();
  const response = new ApiResponse(
    httpStatusCodes.OK,
    newUser,
    "New User Created Successfully"
  );
  return res.json(response);
};

export const updateProfilePicture = async (req, res) => {
  const uid = req.uid;
  const profileImage = req.file;
  let profilePicture = {};

  if (profileImage.path) {
    const urlRes = await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"] = urlRes.secure_url;
    profilePicture["public_id"] = urlRes.public_id;
  }
  // const userResposne = await UserModel.updateOne(
  //   { uid },
  //   { $set: { profilePicture: profilePicture } }
  // );
  const userResposne = await UserModel.findOne({
    uid,
  });

  if (userResposne.profilePicture.public_id) {
    await deleteAssetsFromCloudinary(userResposne.profilePicture.public_id);
  }
  userResposne.profilePicture = profilePicture;

  await userResposne.save();

  const response = new ApiResponse(
    httpStatusCodes.OK,
    userResposne,
    "New User Profile Picture Updated Successfully"
  );
  return res.json(response);
};

export const deleteProfilePicture = async (req, res) => {
  const uid = req.uid;
  // const firebaseProfileURL = req.fireUser.picture;
  const { public_id } = req.body;
  await deleteAssetsFromCloudinary(public_id);

  const userResponse = await UserModel.updateOne(
    { uid },
    { $unset: { profilePicture: {} } }
  );

  const response = new ApiResponse(
    httpStatusCodes.OK,
    userResponse,
    "New User Created Successfully"
  );
  return res.json(response);
};

export const editUser = async (req, res) => {
  const uid = req.uid;
  let { firstName, lastName, email, phoneNumber, gender } = req.body;
  const profileImage = req.file;
  const user = await UserModel.findOne({ uid });

  const profilePicture = {};
  // Check if profile image is uploaded
  if (profileImage && profileImage.path) {
    // Upload profile picture to Cloudinary
    if (user.profilePicture.public_id) {
      await deleteAssetsFromCloudinary(user.profilePicture.public_id);
    }
    const urlRes = await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"] = urlRes.secure_url;
    profilePicture["public_id"] = urlRes.public_id;
  }

  const updatedUser = await UserModel.updateOne(
    { uid },
    {
      $set: {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        profilePicture,
      },
    }
  );

  if (updatedUser.modifiedCount > 0) {
    const response = new ApiResponse(
      httpStatusCodes.OK,
      updatedUser,
      "User updated successfully"
    );
    return res.json(response);
  } else {
    const response = new ApiResponse(
      httpStatusCodes.OK,
      null,
      "User not found or no changes made"
    );
    return res.status(response.statusCode).json(response);
  }
};

export const deleteUser = async (req, res) => {
  const uid = req.uid;
  const user = await UserModel.findOne({ uid });

  if (user.profilePicture.public_id) {
    await deleteAssetsFromCloudinary(user.profilePicture.public_id);
  }
  await deleteUserPreferenceModel(uid);
  await user.deleteOne();

  const response = new ApiResponse(
    httpStatusCodes.ACCEPTED,
    null,
    "User Deleted Succesfully"
  );
  return res.json(response);
};
