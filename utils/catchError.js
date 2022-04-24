const errors = require('./errors');

const catchError = (res, err) => {
  const { statusCode = 500, message = 'Ошибка сервера' } = errors(err);
  return res.status(statusCode).send({ message });
};

module.exports = catchError;
