const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._:/?#!=%]{1,}\.[a-zA-Z0-9()]{1,}\b([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)#?$/;
        return regex.test(link);
      },
      message: 'Укажите корректную ссылку на постер к фильму http:// или https://',
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (link) => {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._:/?#!=%]{1,}\.[a-zA-Z0-9()]{1,}\b([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)#?$/;
        return regex.test(link);
      },
      message: 'Укажите корректную ссылку на трейлер фильма http:// или https://',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (link) => {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._:/?#!=%]{1,}\.[a-zA-Z0-9()]{1,}\b([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)#?$/;
        return regex.test(link);
      },
      message: 'Укажите корректную ссылку на изображение постера http:// или https://',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model.apply('movie', movieSchema);
