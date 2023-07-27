const { Joi, celebrate } = require('celebrate');

const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Валидатор для проверки данных при входе пользователя.
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при создании нового пользователя.
const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// Валидация обновления пользовательских данных
const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

// Валидатор для проверки данных при создании нового фильма.
const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlPattern),
    trailerLink: Joi.string().required().regex(urlPattern),
    thumbnail: Joi.string().required().regex(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при удалении фильма.
const deleteMovieValidator = celebrate({
  params: {
    _id: Joi.string().hex().length(24).required(),
  },
});

module.exports = {
  loginValidator,
  createUserValidator,
  updateUserInfoValidator,
  createMovieValidator,
  deleteMovieValidator,
};
