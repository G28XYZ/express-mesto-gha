const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  console.log("getCards");
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteLike = (req, res) => {
  // Card.findByIdAndRemove(req.params.cardId)
  //   .then((card) => res.send(card))
  //   .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.putLike = (req, res) => {
  // Card.findByIdAndRemove(req.params.cardId)
  //   .then((card) => res.send(card))
  //   .catch((err) => res.status(500).send({ message: err.message }));
};
