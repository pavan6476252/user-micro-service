import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: [Number],
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: String,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const AddressModel = mongoose.model("Addresses", AddressSchema);

export default AddressModel;
