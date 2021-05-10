const router = require('express').Router();

const { // контроллеры
  getCurrentUser,
  editUserInfo,
} = require('../controllers/users.js');

router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе (email и имя)
router.patch('/me', editUserInfo); // обновляет информацию о текущем пользователе (email и имя)

module.exports = router;
