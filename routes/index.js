const router = require('express').Router();

// routes
const { createUser, login } = require('../controllers/users.js');
const userRoutes = require('./users.js');
const movieRoutes = require('./movies.js');
const auth = require('../middlewares/auth');

const { // валидация
  validationCreateUser,
  validationLoginUser,
  validationAuth,
} = require('../middlewares/validations.js');

router.post('/signup', validationCreateUser, createUser); // регистрация
router.posr('/signin', validationLoginUser, login); // логин

router.use(validationAuth, auth); // подключили проверку авторизации

router.use('/users', userRoutes); // роут пользователя
router.use('/movies', movieRoutes); // роут карточек фильмов

module.exports = router;
