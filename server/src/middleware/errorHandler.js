const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errors = err.errors || [];
  let stack = err.stack || "";

  if (process.env.NODE_ENV === "production") {
    stack = undefined;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack,
    data: null,
  });
};

export default errorHandler;