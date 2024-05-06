import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      index: { unique: true },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "seller"],
    },
    gender: {
      type: String,
      default: "none",
      enum: ["male", "female", "others","none"],
    },
    profilePicture: {
      type: {
        secure_url: String,
        public_id: String,
      },
       
    },
    wishList: {
      type: Array,
      default: [],
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addresses",
      },
    ],
    preferences: {
      type: Schema.Types.ObjectId,
      ref: "userPreferences",  
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
