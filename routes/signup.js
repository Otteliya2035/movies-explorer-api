const router = require('express').Router();

const userController = require('../controllers/users');
const { createUserValidator } = require('../middlewares/validations');

// Роут для создания пользователя
router.post('/signup', createUserValidator, userController.createUser);
module.exports = router;
