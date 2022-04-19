const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      unique: true,
      required: true,
    },
    password: {
      unique: true,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
