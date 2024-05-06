import firebaseAdminApp from "../config/firebaseSdkConfig.js";
import ApiResponse from "../utils/ApiResponse.js";

export const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    if ([...bearer].length < 2) {
      const resposne = new ApiResponse(
        401,
        null,
        "Please provide authorization token"
      );
      return res.status(resposne.statusCode).json(resposne);
    } else {
      const bearerToken = bearer[1];
      try {
        const decodedUserInfo = await firebaseAdminApp
          .auth()
          .verifyIdToken(bearerToken);
        if (decodedUserInfo) {
          req.uid = decodedUserInfo.uid;
          req.fireUser = decodedUserInfo;
          req.authenticated = true;
          return next();
        } else {
          throw Error("Failed to verify token");
        }
      } catch (error) {
        if (error.code === "auth/id-token-expired") {
          const resposne = new ApiResponse(401, null, `Token Expired`);
          return res.json(resposne);
        } else {
          const resposne = new ApiResponse(
            500,
            null,
            `"Internal server error ${error}`
          );
          return res.status(resposne.statusCode).json(resposne);
        }
      }
    }
  } else {
    const resposne = new ApiResponse(
      401,
      null,
      "Please provide authorization token"
    );
    return res.status(resposne.statusCode).json(resposne);
  }
};
