class HttpError {
  constructor({ message, name, status }) {
    this.message = message;
    this.name = name;
    this.status = status;
  }

  message() {
    return this.message;
  }

  status() {
    return this.status;
  }

  name() {
    return this.name;
  }
}

export default HttpError;
