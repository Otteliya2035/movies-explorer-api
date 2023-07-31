const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { messages } = require('../utils/constants');

const { NODE_ENV, SECRET_DEV_KEY } = require('../utils/constants');

// Создание пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const userObject = {
        email,
        password: hash,
      };
      if (name) {
        userObject.name = name;
      }
      return User.create(userObject);
    })
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        name, email, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.INCORRECT_DATA));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError(messages.users.EMAIL_EXIST));
        return;
      }

      next(err);
    });
};

// Логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_DEV_KEY : 'some-secret-key', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

// Контроллер для получения информации о текущем пользователе
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new NotFoundError(messages.users.NOT_FOUND);
        next(error);
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      next(error);
    });
};
// Обновление данных пользователя
const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        const error = new NotFoundError(messages.users.NOT_FOUND);
        next(error);
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(messages.INCORRECT_DATA));
        return;
      }
      next(error);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserInfo,
};
