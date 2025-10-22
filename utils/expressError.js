// we can send different different error according to their bad req so 
class ExpressError extends Error {
    constructor(statusCode, message) {
      super(); 
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  module.exports = ExpressError;
  
  // here we are creating a custom error class called ExpressError that extends the built-in Error class in JavaScript. This class takes two parameters: statusCode and message. The statusCode is used to indicate the HTTP status code of the error (e.g., 404 for "Not Found", 500 for "Internal Server Error"), and the message provides a human-readable description of the error.
  // The super() function is called to invoke the constructor of the parent Error class, allowing us to inherit its properties and methods. We then set the statusCode and message properties on the instance of ExpressError.