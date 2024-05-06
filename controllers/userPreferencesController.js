import UserPreferencesModel from "../model/PreferencesModel.js";
import UserModel from "../model/UserModel.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

import ApiResponse from "../utils/ApiResponse.js";

export const updateFcmToken = async (req, res) => {
  const uid = req.uid;
  const { token } = req.body;
  if (!token) {
    const response = new ApiResponse(
      httpStatusCodes.FORBIDDEN,
      null,
      "Token requied"
    );
    return res.json(response);
  }

  const preRes = await UserPreferencesModel.findOneAndUpdate(
    { uid },
    {
      $set: {
        fcm_token: token,
      },
    }
  );
  await preRes.save();

  const response = new ApiResponse(httpStatusCodes.OK, preRes, "Token updated");
  return res.json(response);
};

export const updateWhatsappNotificationStatus = async (req, res) => {
  const uid = req.uid;
  const { status } = req.body;

  const preRes = await UserPreferencesModel.findOneAndUpdate(
    { uid },
    {
      $set: {
        whatsapp_notification: status,
      },
    }
  );
  await preRes.save();
  console.log(await UserPreferencesModel.findOne({ uid }));


  const response = new ApiResponse(
    httpStatusCodes.OK,
    preRes,
    "status updated"
  );
  return res.status(response.statusCode).json(response);
};
export const updateMailNotificationStatus = async (req, res) => {
  const uid = req.uid;
  const { status } = req.body;

  const preRes = await UserPreferencesModel.findOneAndUpdate(
    { uid },
    {
      $set: {
        mail_notification: status,
      },
    }
  );
  await preRes.save();

  const response = new ApiResponse(
    httpStatusCodes.OK,
    preRes,
    "status updated"
  );
  return res.status(response.statusCode).json(response);
};
