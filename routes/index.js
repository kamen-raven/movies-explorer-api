const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error.js'); // 404

// routes
const { createUser, login } = require('../controllers/users.js');
const userRoutes = require('./users.js');
const movieRoutes = require('./movies.js');

// импорт миддлвэров
const auth = require('../middlewares/auth.js'); // авторизация
const { createAccountLimiter } = require('../middlewares/rate-limiter.js'); // лимитер
const { // валидация
  validationCreateUser,
  validationLoginUser,
  validationAuth,
} = require('../middlewares/validations.js');

router.post('/signup', validationCreateUser, createAccountLimiter, createUser); // регистрация
router.post('/signin', validationLoginUser, login); // логин

router.use(validationAuth, auth); // подключили проверку авторизации

router.use('/users', userRoutes); // роут пользователя
router.use('/movies', movieRoutes); // роут карточек фильмов

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному пути не найдена'));
});

module.exports = router;
