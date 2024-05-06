import UserPreferencesModel from "../model/PreferencesModel.js"

export const createUserPreferenceModel = async (uid) => {
    const pref = new UserPreferencesModel({ uid: uid })
    await pref.save();
    return pref;
}

export const deleteUserPreferenceModel = async (uid) => {
    await UserPreferencesModel.findOneAndDelete({ uid: uid })

}