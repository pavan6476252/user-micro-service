import mongoose, { Schema } from "mongoose";

const UserPreferencesSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  fcm_tokens: {
    type: [{ type: String, token: String, device: String }],
    default: [],    
  },
  whatsapp_notification: {
    type: Boolean,
    default: false,
  },
  mail_notification: {
    type: Boolean,
    default: false,
  },
});

const UserPreferencesModel = mongoose.model(
  "userPreferences",
  UserPreferencesSchema
);

export default UserPreferencesModel;
