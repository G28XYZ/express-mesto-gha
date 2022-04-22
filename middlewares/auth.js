const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return handleAuthError(res);
  }
  let payload;
  try {
    payload = await jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  next();
};
