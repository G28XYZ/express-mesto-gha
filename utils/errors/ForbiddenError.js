import HttpError from "./HttpError";

class ForbiddenError extends HttpError {
  constructor({ message, name, status }) {
    super(message, name, status);
  }
}

export default ForbiddenError;
