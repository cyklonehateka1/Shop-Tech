const errorHandler = (message) => {
  const error = new Error();
  message = error.message;
  return message;
};

export default errorHandler;
