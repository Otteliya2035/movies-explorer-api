const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');
const { updateUserInfoValidator } = require('../middlewares/validations');

router.get('/me', userController.getCurrentUser);
router.patch('/me', updateUserInfoValidator, userController.updateUserInfo);

module.exports = router;
