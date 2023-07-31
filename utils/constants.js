const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

const { SECRET_DEV_KEY = 'some-secret-key' } = process.env;

const { DB_URL = 'mongodb://127.0.0.1:27017' } = process.env;

const messages = {
  NOT_FOUND: 'not found',
  SHUT_DOWN: 'Сервер сейчас упадёт',
  INTERNAL_ERR: 'На сервере произошла ошибка',
  INCORRECT_DATA: 'Переданы некорректные данные',
  NO_ACCESS: 'Нет прав доступа',
  users: {
    NOT_FOUND: 'Пользователь не найден',
    EMAIL_EXIST: 'Пользователь с таким email уже существует',
    INCORRECT_EMAIL: 'Некорректный email',
    WRONG_LOG_PASS: 'Неправильные почта или пароль',
  },
  movies: {
    NOT_FOUND: 'Фильм не найден',
    SUCCESS_DELETED: 'Фильм успешно удален',
    INCORRECT_URL: 'Некорректный URL',
  },
  auth: {
    AUTH_NEEDED: 'Необходима авторизация',
  },
  rate_limiter: {
    LIMIT_EXPIRED: 'Превышено количество запросов на сервер. Попробуйте повторить немного позже',
  },
};

module.exports = {
  SECRET_DEV_KEY,
  NODE_ENV,
  DB_URL,
  messages,
};
