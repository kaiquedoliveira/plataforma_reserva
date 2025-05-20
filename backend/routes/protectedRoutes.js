// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware');

// Rota protegida
router.get('/test/protected', verificarToken, (req, res) => {
  res.json({
    message: 'Acesso autorizado!',
    userId: req.user.id // ou req.user, se quiser ver todos os dados do usuário
  });
});

module.exports = router;
