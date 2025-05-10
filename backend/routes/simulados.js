const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os simulados
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM simulados';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar simulados:', err);
      return res.status(500).json({ erro: 'Erro ao buscar simulados' });
    }
    res.json(results);
  });
});

// Adicionar novo simulado
router.post('/', (req, res) => {
  const { titulo, link } = req.body;
  const sql = 'INSERT INTO simulados (titulo, link) VALUES (?, ?)';
  db.query(sql, [titulo, link], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar simulado:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar simulado' });
    }
    res.status(201).json({ id: result.insertId, titulo, link });
  });
});

module.exports = router;
