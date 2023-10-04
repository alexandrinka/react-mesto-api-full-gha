import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUserById, getUsers, updateProfileUser, updateAvatarUser, getUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUser);
usersRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileUser);
usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(www)?[\w-]{1,32}\.[\w-]{1,32}[^\s@]*$/),
  }),
}), updateAvatarUser);

export default usersRoutes;
