import HttpError from "./HttpError";

class DocumentNotFoundError extends HttpError {
  constructor({ message, name, status }) {
    super(message, name, status);
  }
}

export default DocumentNotFoundError;
