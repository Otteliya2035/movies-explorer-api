const router = require('express').Router();

const userController = require('../controllers/users');
const { loginValidator } = require('../middlewares/validations');

router.post('/signin', loginValidator, userController.login);

module.exports = router;
