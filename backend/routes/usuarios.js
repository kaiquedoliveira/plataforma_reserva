const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os usuários
router.get('/', (req, res) => {
  const sql = 'SELECT id, nome, email FROM usuarios ORDER BY nome';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
});

// Adicionar novo usuário
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar usuário' });
    }
    res.status(201).json({ id: result.insertId, nome, email });
  });
});

module.exports = router;
