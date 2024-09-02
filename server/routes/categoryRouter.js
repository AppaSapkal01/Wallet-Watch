const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuth');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/api/v1/categories/create', isAuthenticated, categoryController.create)
router.get('/api/v1/categories/lists', isAuthenticated, categoryController.lists)
router.put('/api/v1/categories/update/:categoryId', isAuthenticated, categoryController.update)
router.delete('/api/v1/categories/delete/:id', isAuthenticated, categoryController.delete)

module.exports = router;
