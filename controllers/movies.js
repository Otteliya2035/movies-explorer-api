const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const { messages } = require('../utils/constants');

// Получение массива с фильмами
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            messages.INCORRECT_DATA,
          ),
        );
      } else {
        next(err);
      }
    });
};

// Удалить фильм
const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movie.findById({ _id })
    .orFail(() => {
      next(new NotFoundError(messages.movies.NOT_FOUND));
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        next(new ForbiddenError(messages.NO_ACCESS));
      }
      return Movie.findByIdAndDelete(movie._id);
    })
    .then(() => {
      res.status(200).send({ message: messages.movies.SUCCESS_DELETED });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(messages.INCORRECT_DATA));
        return;
      }
      next(err);
    });
};
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
