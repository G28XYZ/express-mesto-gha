const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../utils/isLink');

const {
  getUsers,
  getUser,
  updateAvatar,
  updateProfile,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(reg).required(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
