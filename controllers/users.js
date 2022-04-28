const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const catchError = require('../utils/catchError');

const { JWT_SECRET } = process.env;

const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => catchError(err, res));
};

module.exports.getMe = (req, res) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  const createUser = (hash) =>
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => res.send(user))
    .catch((err) => catchError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) =>
      res.send({
        _id: [user._id],
        avatar: user.avatar,
        name,
        about,
      }),
    )
    .catch((err) => catchError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) =>
      res.send({
        _id: user._id,
        avatar,
        name: user.name,
        about: user.about,
      }),
    )
    .catch((err) => catchError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => catchError(err, res));
};
