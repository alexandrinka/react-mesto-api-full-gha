import Card from '../models/Card';
import NotFoundError from '../errors/not-found-err';
import InvalidRequest from '../errors/invalid-request';
import NoRight from '../errors/no-right';

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const deleteCardById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { cardId } = req.params;
    const checkRight = await Card.findOne({ owner: { _id }, _id: cardId });
    if (!checkRight) throw new NoRight('Данный пользователь не может удалить эту карточку');

    const card = await Card.findByIdAndRemove(cardId);
    if (!card) throw new NotFoundError('Запрашиваемая карточка не найдена');
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const createCard = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const newCard = await Card.create(req.body);
    res.status(201).send(await newCard.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const newCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!newCard) throw new NotFoundError('Запрашиваемая карточка не найдена');
    res.status(200).send(await newCard.save());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const newCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!newCard) throw new NotFoundError('Запрашиваемая карточка не найдена');
    res.status(200).send(await newCard.save());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};
