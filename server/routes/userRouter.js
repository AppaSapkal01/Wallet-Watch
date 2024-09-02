const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuth');

const router = express.Router();

router.post('/api/v1/user/register', userController.register);
router.post('/api/v1/user/login', userController.login);
router.get('/api/v1/user/profile', isAuthenticated, userController.profile)
router.put('/api/v1/user/change-password', isAuthenticated, userController.changeUserPassword)
router.put('/api/v1/user/update-user', isAuthenticated, userController.updateUserProfile)

module.exports = router;
