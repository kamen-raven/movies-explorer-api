const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// импорт модели
const User = require('../models/user.js');
const { JWT_SECRET } = require('../utils/config.js');

// подключаем классы ошибок
const BadRequestError = require('../errors/bad-request-error.js'); // 400
const NotFoundError = require('../errors/not-found-error.js'); // 404
const ConflictError = require('../errors/conflict-error.js'); // 409

// регистрация пользователя - POST /signup
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new BadRequestError('Необходимо заполнить указанные поля');
  }
  if (password.length < 8) {
    throw new BadRequestError('Пароль не может быть короче 8 символов');
  }
  bcrypt.hash(password, 10) // хэшируем пароль
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.status(201).send(user.toJSON()))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`Некорректный ввод данных пользователя: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else if (err.name === 'CastError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Пользователь с указанной почтой уже существует'));
          } else {
            next(err);
          }
        });
    });
};

// вход пользователя - POST /signin
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' }, // хранится 7 дней
      );
      res.send({ token }); // возвращаем токен jwt
    })
    .catch((err) => {
      next(err);
    });
};

// возвращает информацию о текущем пользователе - GET /users/me
const getCurrentUser = (req, res, next) => {
  const myId = req.user._id;
  User.findById(myId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе (email и имя) - PATCH /users/me
const editUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const myId = req.user._id;
  User.findByIdAndUpdate(
    myId,
    { email, name },
    { new: true, runValidators: true }, // документ после обновления
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с указанной почтой уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  editUserInfo,
};
