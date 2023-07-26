const express = require('express');
const { Joi, celebrate } = require('celebrate');

const router = express.Router();
const movieController = require('../controllers/movies');

const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

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

// Роуты для фильмов
router.get('/', movieController.getMovies);
router.post('/', createMovieValidator, movieController.createMovie);
router.delete('/:_id', deleteMovieValidator, movieController.deleteMovie);

module.exports = router;
