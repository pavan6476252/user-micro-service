import axios from "axios";
import UserPreferencesModel from "../model/PreferencesModel";
import UserModel from "../model/UserModel";
import { NotFoundError } from "../utils/errors/app-errors";
import AddressRepository from "./address-repository";

class UserRepository {
  constructor() {}

  async createNewUser(inputs) {
    const {
      uid,
      firstName,
      lastName,
      email,
      phoneNumber,
      preferences,
      gender,
      profilePicture,
    } = inputs;
    // uid: fireUser.uid,
    // firstName,
    // lastName,
    // email: fireUser.email,
    // phoneNumber: fireUser.phone_number,
    // preferences: pref._id,
    const newUser = new UserModel({
      uid,
      firstName,
      lastName,
      email,
      phoneNumber,
      preferences,
      gender,
      profilePicture,
    });

    await newUser.save();

    return newUser;
  }

  async findUserExists(uid) {
    return await UserModel.findOne({ uid });
  }

  async findUserByUID(uid) {
    return await UserModel.findOne({ uid }).populate("preferences");
  }

  async updateProfilePicture(uid, profilePicture) {
    return await UserModel.findOneAndUpdate(
      { uid },
      {
        $set: {
          profilePicture,
        },
      }
    );
  }

  async updateUserInfo({
    uid,
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    profilePicture,
  }) {
    return await UserModel.findOneAndUpdate(
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
  }
  async deleteUser({ uid }) {
    return await UserModel.findOneAndDelete({ uid });
  }

  async addNewAddressToUserProfile({ uid, addressId }) {
    return await UserModel.findOneAndUpdate(
      { uid },
      { $push: { addresses: addressId } }
    );
  }

  // preferences
  async findUserPreferencesByUID(uid) {
    return await UserPreferencesModel.findOne({ uid });
  }

  async createUserPreferenceModel(uid) {
    const pref = new UserPreferencesModel({ uid: uid });
    await pref.save();
    return pref;
  }

  async deleteUserPreferenceModel(uid) {
    return await UserPreferencesModel.findOneAndDelete({ uid: uid });
  }

  //address

  async getAddresses(uid) {
    const user = await UserModel.findOne({ uid }).populate("addresses");
    return user.addresses;
  }

  async addNewAddress(inputs) {
    const { uid, addressId } = inputs;

    return UserModel.findOneAndUpdate(
      { uid },
      {
        $push: {
          addresses: addressId,
        },
      }
    );
  }

  async removeAddress({ uid, addressId }) {
    const user = await UserModel.findOneAndUpdate(
      { uid },
      { $pull: { addresses: addressId } }
    );
    console.log(user.addresses);
    return user.addresses;
  }

  //whishlist
  async getWishlist(uid) {
    const user = await UserModel.findOne({ uid });

    if (!user) throw new NotFoundError("User doesn't exists");
    if (!user.wishList) return [];
    const { data } = await axios.get(process.env.PRODUCTS_BASEURL, {
      arr: user.wishList || [],
    });

    return data;
  }

  async updateWishlist({ productId, uid }) {
    const user = await UserModel.findOne({ uid });

    if (!user) throw new NotFoundError("User doesn't exists");

    const wishlist = user.wishList || [];

    // if the wishlist contains the item, remove it
    let newWishlist = [];
    if (wishlist.includes(productId))
      newWishlist = wishlist.filter((item) => item !== productId);
    // else add it to the wishlist
    else newWishlist = [...wishlist, productId];

    await UserModel.findOneAndUpdate(
      { uid },
      { $set: { wishList: newWishlist } }
    );

    return null;
  }
}

export default UserRepository;
