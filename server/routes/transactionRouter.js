const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const transactionController = require('../controllers/transactionController')
const router = express.Router();

router.post('/api/v1/transactions/create', isAuthenticated, transactionController.create)
router.get('/api/v1/transactions/lists', isAuthenticated, transactionController.getFilteredTransactions)
router.put('/api/v1/transactions/update/:id', isAuthenticated, transactionController.update);
router.delete('/api/v1/transactions/delete/:id', isAuthenticated, transactionController.delete);
router.get('/api/v1/transactions/get-transaction/:id', isAuthenticated, transactionController.getTransactionById);

module.exports = router;
