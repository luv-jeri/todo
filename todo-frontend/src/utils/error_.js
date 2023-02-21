class Error_ extends Error {
  constructor(message, title = 'Error') {
    super(message);
    this.title = title;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default Error_;