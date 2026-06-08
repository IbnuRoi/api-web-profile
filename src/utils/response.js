const response = (status, data, message, res, meta = null) => {
  const responseBody = data ? { data, ...(meta && { meta }), message }
    : { message }
  
  res.status(status).json(responseBody);
};

module.exports = response;
