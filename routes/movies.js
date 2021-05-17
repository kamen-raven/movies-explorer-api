const router = require('express').Router();

const { // контроллеры
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies.js');
const { createMovieLimiter } = require('../middlewares/rate-limiter.js'); // лимитер
const { // валидация
  validationCreateMovie,
  validationDeleteMovieById,
} = require('../middlewares/validations.js');

router.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
router.post('/', validationCreateMovie, createMovieLimiter, createMovie); // создаёт фильм

router.delete('/:movieId', validationDeleteMovieById, deleteMovieById); // удаляет сохранённый фильм по _id

module.exports = router;
