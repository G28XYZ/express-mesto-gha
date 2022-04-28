const errors = require('./errors');

const catchError = (err, res) => {
  const error = errors(err);
  if (!error) {
    return res.status(500).send({ message: 'Ошибка сервера' });
  }
  const { statusCode, message } = error;
  return res.status(statusCode).send({ message });
};

module.exports = catchError;
