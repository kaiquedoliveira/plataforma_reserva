const express = require('express');
const verificarToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', verificarToken, (req, res) => {
  res.json({ message: 'Acesso autorizado!', userId: req.userId });
});

module.exports = router;
