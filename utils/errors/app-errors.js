const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export default StatusCodes;

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
class APIError extends BaseError {
  constructor(description = "API Error") {
    super("API Internal Error", StatusCodes.INTERNAL_SERVER_ERROR, description);
  }
}

// 400 validation error
class ValidationError extends BaseError {
  constructor(description = "Bad Request") {
    super("BAS REQUEST", StatusCodes.BAD_REQUEST, description);
  }
}

// 403 Authorization error
class AuthorizationError extends BaseError {
  constructor(description = "access denied") {
    super("access denied", StatusCodes.UN_AUTHORIZED, description);
  }
}

// 404 Not found
class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super("not found", StatusCodes.BAD_REQUEST, description);
  }
}

export { APIError, ValidationError, AuthorizationError, NotFoundError };
