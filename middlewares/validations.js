const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

// ------------------ВАЛИДАЦИЯ USER------------------ //

// валидация контроллера регистрации пользователя - createUser
const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Укажите корректную почту');
      })
      .messages({
        'any.required': 'Введите почту для регистрации',
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Пароль должен быть минимум 8 символов',
        'any.required': 'Введите пароль',
      }),
    username: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Имя пользователя должно быть минимум 2 символа',
        'string.max': 'Имя пользователя должно быть максимум 30 символов',
        'any.required': 'Введите имя пользователя',
      }),
  }).unknown(true),
});

// валидация контроллера входа пользователя - login
const validationLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Укажите корректную почту');
      })
      .messages({
        'any.required': 'Введите почту для регистрации',
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Пароль должен быть минимум 8 символов',
        'any.required': 'Введите пароль',
      }),
  }).unknown(true),
});

// валидация контроллера обновления информации о пользователе - editUserInfo
const validationEditUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Укажите корректную почту');
      })
      .messages({
        'any.required': 'Введите почту',
      }),
    username: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Имя пользователя должно быть минимум 2 символа',
        'string.max': 'Имя пользователя должно быть максимум 30 символов',
        'any.required': 'Введите имя пользователя',
      }),
  }).unknown(true),
});

// ------------------ВАЛИДАЦИЯ MOVIE ------------------ //

// валидация контроллера создания карточки фильма - createMovie
const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать страну создания фильма',
      }),
    director: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать режиссера фильма',
      }),
    duration: Joi.number()
      .required()
      .messages({
        'any.required': 'Необходимо указать длительность фильма',
      }),
    year: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать год выпуска фильма',
      }),
    description: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать описание фильма',
      }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Укажите корректную ссылку на постер к фильму');
      })
      .messages({
        'any.required': 'Необходимо указать ссылку на постер к фильму',
      }),
    trailer: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Укажите корректную ссылку на трейлер фильма');
      })
      .messages({
        'any.required': 'Необходимо указать ссылку на трейлер фильма',
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Укажите корректную ссылку на изображение постера к фильму');
      })
      .messages({
        'any.required': 'Необходимо указать ссылку на изображение постера к фильму',
      }),
    movieId: Joi.number()
      .required()
      .messages({
        'any.required': 'Необходимо указать id фильма',
      }),
    nameRU: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать название фильма на русском языке',
      }),
    nameEN: Joi.string()
      .required()
      .messages({
        'any.required': 'Необходимо указать название фильма на английском языке',
      }),
  }).unknown(true),
});

// валидация контроллера удаления сохранённого фильма по идентификатору - deleteMovieById
const validationDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Проблемы с _id фильма: неверный формат идентификатора');
      }),
  })
    .unknown(true),
});

module.exports = {
  // пользователь
  validationCreateUser,
  validationLoginUser,
  validationEditUserInfo,
  // фильмы
  validationCreateMovie,
  validationDeleteMovieById,
};
