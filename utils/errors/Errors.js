const NotFoundError = require('./NotFoundError');
const CastError = require('./CastError');
const ValidationError = require('./ValidationError');
const ConflictError = require('./ConflictError');
const UnauthorizedError = require('./UnauthorizedError');

const errors = (err) => {
  const errorClasses = {
    CastError: new CastError('Некорректный id пользователя'),
    NotFoundError: new NotFoundError(err.message || 'Пользователь не найден'),
    ValidationError: new ValidationError(err.message),
    MongoServerError: new ConflictError(
      'Пользователь c веденным email уже существует, введите другой email',
    ),
    UnauthorizedError: new UnauthorizedError(err.message),
  };

  return errorClasses[err.name];
};

module.exports = errors;
