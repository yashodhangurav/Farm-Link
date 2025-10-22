module.exports = (fn)=> {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  }  
  
  // we are going to use this function to wrap all our async functions in the routes so that if any error occurs it will be passed to the next middleware which is the error handling middleware
  // This is a higher-order function that takes an async function (fn) as an argument