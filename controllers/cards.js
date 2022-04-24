const Card = require('../models/card');
const NotFoundError = require('../utils/errors/NotFoundError');
const catchError = require('../utils/catchError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => catchError(err, res));
};

module.exports.deleteCard = (req, res) => {
  const removeCard = () => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send(card))
      .catch((err) => catchError(err, res));
  };

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки не существует');
      if (req.user._id === card.owner.toString()) {
        return removeCard();
      }
      return res
        .status(403)
        .send({ message: 'Попытка удалить чужую карточку' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          'Запрашиваемая карточка для добавления лайка не найдена',
        );
      }
      return res.send(card);
    })
    .catch((err) => catchError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          'Запрашиваемая карточка для удаления лайка не найдена',
        );
      }
      return res.send(card);
    })
    .catch((err) => catchError(err, res));
};
