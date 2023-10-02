import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  createCard, deleteCardById, getCards, likeCard, dislikeCard,
} from '../controllers/cards';

const usersRoutes = express.Router();

usersRoutes.get('/', getCards);
usersRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardById);
usersRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/https?:\/\/(www)?[\w-]{1,32}\.[\w-]{1,32}[^\s@]*$/),
  }),
}), createCard);
usersRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);
usersRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

export default usersRoutes;
