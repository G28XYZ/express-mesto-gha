const ConflictError = require('./ConflictError');

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (error.code === 11000) {
    error = new ConflictError('Пользователь уже существует');
  }
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : error.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
