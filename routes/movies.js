const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validations');

// Роуты для фильмов
router.get('/', movieController.getMovies);
router.post('/', createMovieValidator, movieController.createMovie);
router.delete('/:_id', deleteMovieValidator, movieController.deleteMovie);

module.exports = router;
