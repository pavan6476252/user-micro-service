import Usermodel from "../model/UserModel.js";
import AddressModel from "../model/AddressModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAdresses = async (req, res) => {
  const uid = req.uid;
  const userProfile = await Usermodel.findOne({ uid }).populate("addresses");
  const resposne = new ApiResponse(
    201,
    userProfile.addresses,
    "get new Address"
  );
  return res.json(resposne);
};

export const addAdress = async (req, res) => {
  const uid = req.uid;
  const userProfile = await Usermodel.findOne({ uid });
  if (userProfile) {
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
    const address = new AddressModel({
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
    await address.save();

    userProfile.addresses.push(address._id);

    await userProfile.save();

    const resposne = new ApiResponse(201, address, "All Address");
    return res.json(resposne);
  } else {
    throw new Error("user not found");
  }
};

export const editAdress = async (req, res) => {
  const { addressId } = req.params;
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
  if (addressId) {
    await AddressModel.findByIdAndUpdate(addressId, {
      $set: {
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
      },
    });

    const resposne = new ApiResponse(
      200,
      null,
      "address updated succesfully"
    );
   
    return res.status(resposne.statusCode).json(resposne);
  } else {
    throw new Error("address not found");
  }
};

export const deleteAdress = async (req, res) => {
  const uid = req.uid;
  const { addressId } = req.params;

  const userProfile = await Usermodel.findOne({ uid });

  if (userProfile && addressId !== undefined) {
    await AddressModel.findByIdAndDelete(addressId);

    userProfile.addresses = userProfile.addresses.filter(
      (id) => id !== addressId
    );

    await userProfile.save();

    const resposne = new ApiResponse(202, null, "Address deleted Successful");
    return res.json(resposne);
  } else {
    throw new Error("user not found");
  }
};
