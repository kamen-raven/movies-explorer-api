const router = require('express').Router();

const { // контроллеры
  getCurrentUser,
  editUserInfo,
} = require('../controllers/users.js');

const { // валидация
  validationGetCurrentUser,
  validationEditUserInfo,
} = require('../middlewares/validations.js');

router.get('/me', validationGetCurrentUser, getCurrentUser); // возвращает информацию о текущем пользователе (email и имя)
router.patch('/me', validationEditUserInfo, editUserInfo); // обновляет информацию о текущем пользователе (email и имя)

module.exports = router;
