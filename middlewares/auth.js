const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config.js');

const UnauthorizedError = require('../errors/unauthorized-error.js'); // 401

const auth = (req, res, next) => {
  const { authorization } = req.headers; // заголовок

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация пользователя');
  } // проверка наличия токена

  const token = authorization.replace('Bearer ', ''); // извлечение токена без Bearer

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET); // верификация токена
  } catch (err) { // обработка ошибок
    throw new UnauthorizedError('Необходима авторизация пользователя');
  }

  req.user = payload; // записали в объект запроса
  next();
};

module.exports = auth;
