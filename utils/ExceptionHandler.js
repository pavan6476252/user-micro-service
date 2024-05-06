import ApiResponse from "./ApiResponse.js";

const exceptionHandler = (error, req, res, next) => {
  const errMsg = error.message || "Something went wrong";

  console.log("Exception Raised");
  console.log(errMsg);

  const response = new ApiResponse(500, null, errMsg);
  return res.status(response.statusCode).json(response);
};

export default exceptionHandler;
