import AddressRepository from "../repository/address-repository.js";
import CloudinaryRepository from "../repository/cloudinary-repository.js";
import PreferencesRepository from "../repository/preferences-repository.js";
import UserRepository from "../repository/user-repository.js";
import { newApiResponse } from "../utils/ApiResponse";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../utils/errors/app-errors.js";
import { StatusCodes } from "../utils/httpStatusCodes.js";

class UserServices {
  constructor() {
    this.respository = new UserRepository();
    this.cloudinaryRepository = new CloudinaryRepository();
    this.addressRepo = new AddressRepository();
    this.preferencesRepo = new PreferencesRepository();
  }

  async getUser(uid) {
    const user = await this.respository.findUserByUID(uid);
    if (!user) {
      throw new NotFoundError("User not found . please create a account first");
    }
    return user;
  }

  async createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    uid,
    file,
  }) {
    const user = await this.respository.findUserByUID(uid);
    if (!user) throw new ConflictError("user already exists , please login");

    let image = {};
    if (file.path) {
      const fileRes = await this.cloudinaryRepository.uploadFile(
        file.path,
        file.filename
      );
      image["secure_url"] = fileRes.secure_url;
      image["public_id"] = fileRes.public_id;
      image["mime_type"] = file.mimetype;
    }
    const prefs = await this.respository.createUserPreferenceModel(uid);
    const newUser = await this.respository.createNewUser({
      uid,
      firstName,
      lastName,
      email,
      phoneNumber,
      preferences: prefs._id,
      gender,
      profilePicture: image,
    });

    return newUser;
  }

  async autoCreateUser({ firebaseUser }) {
    const { phone_number, email, uid } = firebaseUser;
    const user = await this.respository.findUserByUID(uid);
    if (!user) {
      return user;
    }
    const preferences = await this.respository.createUserPreferenceModel(uid);
    const newUser = await this.respository.createNewUser({
      uid,
      firstName,
      lastName,
      email,
      phoneNumber: phone_number,
      preferences: preferences._id,
    });

    // return newUser;
    return await this.respository.findUserByUID(uid);
  }

  async updateProfilePicture({ file, uid }) {
    if (!file.path) throw new ValidationError("please provide image");

    let image = {};
    if (file.path) {
      const fileRes = await this.cloudinaryRepository.uploadFile(
        file.path,
        file.filename
      );
      image["secure_url"] = fileRes.secure_url;
      image["public_id"] = fileRes.public_id;
      image["mime_type"] = file.mimetype;
    }

    const user = await this.respository.updateProfilePicture(uid, image);

    if (user.profilePicture)
      await this.cloudinaryRepository.deleteFile(user.profilePicture.public_id);

    return user;
  }

  async deleteProfilePicture({ uid, public_id }) {
    if (public_id) {
      await this.cloudinaryRepository.deleteFile(public_id);
    }
    return await this.respository.updateProfilePicture(uid, null);
  }

  async editProfileInfo({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    uid,
    file,
  }) {
    const user = await this.respository.findUserByUID(uid);

    if (!user) throw new NotFoundError("User not found");
    let image = {};
    if (file && file.path) {
      const fileRes = await this.cloudinaryRepository.uploadFile(
        file.path,
        file.filename
      );
      image["secure_url"] = fileRes.secure_url;
      image["public_id"] = fileRes.public_id;
      image["mime_type"] = file.mimetype;
    }

    const updateProfile = await this.respository.updateUserInfo({
      uid: uid,
      lastName: lastName,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      profilePicture: image,
    });
    console.log(updateProfile.isModified);
    console.log("updateProfile", updateProfile);

    return updateProfile;
  }

  async deleteUser({ uid }) {
    const user = await this.respository.deleteUser({ uid });
    if (user.profilePicture)
      this.cloudinaryRepository.deleteFile(user.profilePicture?.public_id);

    return user;
  }

  // address

  async getAddresses(uid) {
    return await this.respository.getAddresses(uid);
  }

  async addNewAddress({
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
  }) {
    const newAddress = await this.addressRepo.createAddress({
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

    return await this.respository.addNewAddressToUserProfile({
      uid,
      addressId: newAddress._id,
    });
  }

  async editAddress({
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
  }) {
    return await this.addressRepo.editAddress({
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
  }

  async deleteAddress({ uid, addressId }) {
    const user = await this.respository.findUserExists(uid);
    if (!user) throw new NotFoundError("User doesnt exists");

    const address = await this.addressRepo.deleteAddress(addressId);
    console.log(address);
    return this.respository.removeAddress({ uid, addressId });
  }

  // wishlist

  async getWishlist({ uid }) {
    return await this.respository.getWishlist(uid);
  }

  async updateWishlist({ productId, uid }) {
    return await this.respository.updateWishlist({ productId, uid });
  }

  // user prefs

  async updateFCMToken({ uid, type, token, device }) {
    return await this.preferencesRepo.updateAndroidFCMToken({
      uid,
      type,
      token,
      device,
    });
  }
}

export default UserServices;
