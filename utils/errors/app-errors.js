import { StatusCodes } from "../httpStatusCodes";

 

class BaseError extends Error {
  constructor(
    name,
    statusCode,
    description
    // isOperational,
    // errorStack,
    // logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
    // this.isOperational = isOperational;
    // this.errorStack = errorStack;
    // this.logError = logingErrorResponse;
  }
}

// 500 internal error
export class APIError extends BaseError {
  constructor(description = "API Error") {
    super("API Internal Error", StatusCodes.INTERNAL_SERVER_ERROR, description);
  }
}

// 400 validation error
export class ValidationError extends BaseError {
  constructor(description = "Bad Request") {
    super("BAS REQUEST", StatusCodes.BAD_REQUEST, description);
  }
}

// 403 Authorization error
export class AuthorizationError extends BaseError {
  constructor(description = "access denied") {
    super("access denied", StatusCodes.UN_AUTHORIZED, description);
  }
}

// 404 Not found
export class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super("not found", StatusCodes.BAD_REQUEST, description);
  }
}

// 409 Not found
export class ConflictError extends BaseError {
  constructor(description = "conflict error") {
    super("conflict error", StatusCodes.CONFLICT, description);
  }
}
