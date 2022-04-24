const errors = require('./errors');

const catchError = (err, res) => {
  const { statusCode = 500, message = 'Ошибка сервера' } = errors(err);
  return res.status(statusCode).send({ message });
};

module.exports = catchError;
