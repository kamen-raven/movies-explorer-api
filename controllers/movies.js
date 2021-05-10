const Movie = require('../models/movie.js');

// подключаем классы ошибок
const BadRequestError = require('../errors/bad-request-error.js'); // 400
const ForbiddenError = require('../errors/forbidden-error.js'); // 403
const NotFoundError = require('../errors/not-found-error.js'); // 404

// возвращает все сохранённые пользователем фильмы - GET /movies
const getMovies = (req, res, next) => {
/* const owner = req.user._id; */
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создаёт фильм - POST /movies
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при добавлении фильма: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по идентификатору - DELETE /movies/:movieId
const deleteMovieById = (res, req, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId) // проверяем права пользователя на добавленный фильм
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден в избранном');
    })
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав для удаления фильма'));
      } else {
        Movie.deleteOne(movieId) // и только тут удаляем, если права подтверждены
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удален' });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id карточки: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
