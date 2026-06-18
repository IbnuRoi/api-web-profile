const response = (status, data, message, res, meta = null) => {
  const responseBody = data ? { status, data, ...(meta && { meta }), message }
    : { status, message }
  
  res.status(status).json(responseBody);
};

module.exports = response;
