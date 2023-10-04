import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import NotFoundError from '../errors/not-found-err';
import InvalidRequest from '../errors/invalid-request';
import NotAutorization from '../errors/not-autorization';
import UserAuthorized from '../errors/user-autorized';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new InvalidRequest('Неправильный адрес электронной почты или пароль');
    const hash = await bcrypt.hash(password, 10);
    const { _id } = await User.create({ email, password: hash });
    res.status(201).send({ _id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильный адрес электроной почты или пароль'));
    } else if (err.code === 11000) {
      next(new UserAuthorized('Пользователь с таким email уже зарегистрирован'));
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new NotAutorization('Неправильный адрес электронной почты или пароль');
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new NotAutorization('Неправильный адрес электронной почты или пароль');

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new NotAutorization('Неправильный адрес электронной почты или пароль');

    const payload = { _id: user._id };
    const token = jwt.sign(payload, '!q8AcиПььaqЙ', { expiresIn: '1w' });

    res.send({ token });
  } catch (err) {
    next(err);
  }
};

export const updateProfileUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, context: 'query' });
    if (!user) throw new InvalidRequest('Запрашиваемый пользователь не найден');
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const updateAvatarUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) throw new InvalidRequest('Запрашиваемый пользователь не найден');
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};
