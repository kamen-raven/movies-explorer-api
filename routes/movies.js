const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies.js');

router.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
router.post('/', createMovie); // создаёт фильм

router.delete('/:movieId', deleteMovieById); // удаляет сохранённый фильм по _id

module.exports = router;
