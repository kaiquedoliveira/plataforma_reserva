const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Rota para listar todas as matérias
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM materias';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar matérias:', err);
      return res.status(500).json({ erro: 'Erro ao buscar matérias' });
    }
    res.json(results);
  });
});

// Rota para adicionar uma nova matéria
router.post('/', (req, res) => {
  const { nome, descricao } = req.body;
  const sql = 'INSERT INTO materias (nome, descricao) VALUES (?, ?)';
  db.query(sql, [nome, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar matéria:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar matéria' });
    }
    res.status(201).json({ id: result.insertId, nome, descricao });
  });
});

module.exports = router;
