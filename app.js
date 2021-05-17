// импорт модулей
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

// импорт констант ПОРТ и адрес MongoDB
const {
  PORT,
  MONGO_URL,
} = require('./utils/config.js'); /* const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env; */

// импорт роутов
const router = require('./routes/index.js');

// импорт миддлвэров
const errorHandler = require('./middlewares/error-handler.js'); // обработчик ошибок
const { limiter } = require('./middlewares/rate-limiter.js'); // лимитер
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger.js'); // логгирование

const app = express();

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключение логгера запросов
app.use(limiter); // подключение лимитера на запросы
app.use(helmet()); // подключение защиты helmet
app.use(cors()); // подключение cors
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(router); // все внутренние роуты

app.use(errorLogger); // подключение логгера ошибок
app.use(errors()); // обработчик ошибок валидации celebrate
app.use(errorHandler); // централизованный обработчик ошибок запросов

app.listen(PORT);
