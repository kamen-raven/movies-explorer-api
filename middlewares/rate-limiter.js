const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 20, // блокировка после 100 запросов
  message:
    'Слишком много запросов с одного IP, пожалуйста, попробуйте продолжить позже',
});

const createAccountLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 минут
  max: 5, // блокировка после 5 запросов
  message:
    'Слишком много аккаунтов создано с одного IP, пожалуйста, продолжите работу позже',
});

const createMovieLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 минут
  max: 50, // блокировка после 50 фильмов
  message:
    'Слишком много фильмов добавлено с одного IP, пожалуйста, продолжите работу позже',
});

module.exports = {
  limiter,
  createAccountLimiter,
  createMovieLimiter,
};
