import express from 'express';
import { celebrate, Joi } from 'celebrate';
import usersRoutes from './users.js';
import cardsRoutes from './cards.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/not-found-err.js';
import { login, createUser } from '../controllers/users.js';

const routes = express.Router();

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

export default routes;
