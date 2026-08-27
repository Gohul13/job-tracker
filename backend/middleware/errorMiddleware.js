const errorMiddleware = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
};

export default errorMiddleware; 