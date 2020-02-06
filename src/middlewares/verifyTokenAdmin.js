const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SIGNING_KEY, (err, user) => {
      if (err && err.name === 'TokenExpiredError') {
        res.status(401).send({
          statusText: 'Unauthorized',
          statusCode: 401,
          message: `${err.message}`,
        });
      } else if (err && err.name === 'JsonWebTokenError') {
        res.status(403).send({
          statusText: 'Forbidden',
          status: 403,
          message: `${err.message}`,
        });
      } else {
        req.tokenContent = user;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: 'Authentication Error \n token not exist',
    });
  }
};
