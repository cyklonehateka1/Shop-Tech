export const errorHandler = (status, message) => {
  const error = new Error();

  Error.message = message;
  Error.status = status;
  return error;
};
