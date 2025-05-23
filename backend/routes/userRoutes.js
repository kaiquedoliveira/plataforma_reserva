const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota de cadastro
router.post('/register', userController.register);

// Rota de login
router.post('/login', userController.login);

module.exports = router;
