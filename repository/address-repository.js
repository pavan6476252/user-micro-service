import AddressModel from "../model/AddressModel";

class AddressRepository {
  async createAddress({
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

    return address;
  }

  async deleteAddress(id) {
    return await AddressModel.findByIdAndDelete(id);
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
    return await AddressModel.findByIdAndUpdate(addressId, {
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
  }

}

export default AddressRepository;
