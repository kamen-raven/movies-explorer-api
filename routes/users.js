const router = require('express').Router();

const { // контроллеры
  getCurrentUser,
  editUserInfo,
} = require('../controllers/users.js');

const { // валидация
  validationEditUserInfo,
} = require('../middlewares/validations.js');

router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе (email и имя)
router.patch('/me', validationEditUserInfo, editUserInfo); // обновляет информацию о текущем пользователе (email и имя)

module.exports = router;
