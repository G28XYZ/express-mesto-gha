const NotFoundError = require('./NotFoundError');
const CastError = require('./CastError');
const ValidationError = require('./ValidationError');
const ConflictError = require('./ConflictError');
const UnauthorizedError = require('./UnauthorizedError');

const Errors = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'На сервере произошла ошибка';
  const errorName = err.name;
  const errorClasses = {
    CastError: new CastError('Некорректный id'),
    NotFoundError: new NotFoundError(err.message || 'Пользователь не найден'),
    ValidationError: new ValidationError(err.message),
    MongoServerError: new ConflictError(
      'Пользователь c веденным email уже существует, введите другой email',
    ),
    UnauthorizedError: new UnauthorizedError(err.message),
  };

  const error = errorClasses[errorName];

  if (error) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = Errors;
