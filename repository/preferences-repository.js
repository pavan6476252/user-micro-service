import UserPreferencesModel from "../model/PreferencesModel";

class PreferencesRepository {
  async updateAndroidFCMToken({ uid, type, token, device }) {
    const prefs = await UserPreferencesModel.findOne({uid});

    const existingTokenIndex = prefs.fcm_tokens.findIndex(
      (tkn) => tkn.type === type
    );

    if (existingTokenIndex !== -1) {
      prefs.fcm_tokens[existingTokenIndex].token = token;
      prefs.fcm_tokens[existingTokenIndex].device = device;
    } else {
      prefs.fcm_tokens.push({ type, token, device });
    }

    await prefs.save();

    return prefs;
  }
}

export default PreferencesRepository;
