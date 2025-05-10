const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os cursos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM cursos ORDER BY nome';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar cursos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar cursos' });
    }
    res.json(results);
  });
});

// Adicionar novo curso
router.post('/', (req, res) => {
  const { nome, link, descricao } = req.body;
  const sql = 'INSERT INTO cursos (nome, link, descricao) VALUES (?, ?, ?)';
  db.query(sql, [nome, link, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar curso:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar curso' });
    }
    res.status(201).json({ id: result.insertId, nome, link, descricao });
  });
});

module.exports = router;
