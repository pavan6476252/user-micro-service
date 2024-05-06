import firebaseAdminApp from "../config/firebaseSdkConfig.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  APIError,
  AuthorizationError,
  ValidationError,
} from "../utils/errors/app-errors.js";

export const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined)
    throw new AuthorizationError("Please provide authorization token");

  const bearer = bearerHeader.split(" ");
  if ([...bearer].length < 2)
    throw new AuthorizationError("Please provide authorization token");
  else {
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
        throw new APIError("Token verification failed.");
      }
    } catch (error) {
      if (error.code === "auth/id-token-expired")
        throw new ValidationError("Token Exprired");

      console.log(error);
      throw new APIError("Server Error");
    }
  }
};
