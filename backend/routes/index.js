import express from 'express';
import { celebrate, Joi } from 'celebrate';
import usersRoutes from './users';
import cardsRoutes from './cards';
import auth from '../middlewares/auth';
import NotFoundError from '../errors/not-found-err';
import { login, createUser } from '../controllers/users';

const routes = express.Router();

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
