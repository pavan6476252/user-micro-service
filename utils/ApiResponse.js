import { response } from "express";

class ApiResponse {
  constructor(statusCode, data, message = "None") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export const newApiResponse = (res, statusCode, data, message) => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(response.statusCode).json(response);
};

export default ApiResponse;
