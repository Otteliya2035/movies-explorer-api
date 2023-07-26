const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

// Роуты для пользователя
router.get('/me', userController.getCurrentUser);
router.patch('/me', userController.updateUserInfo);

module.exports = router;
