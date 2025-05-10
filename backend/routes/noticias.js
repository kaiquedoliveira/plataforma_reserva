const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todas as notícias
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM noticias ORDER BY data_publicacao DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar notícias:', err);
      return res.status(500).json({ erro: 'Erro ao buscar notícias' });
    }
    res.json(results);
  });
});

// Adicionar nova notícia
router.post('/', (req, res) => {
  const { titulo, link, data_publicacao } = req.body;
  const sql = 'INSERT INTO noticias (titulo, link, data_publicacao) VALUES (?, ?, ?)';
  db.query(sql, [titulo, link, data_publicacao], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar notícia:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar notícia' });
    }
    res.status(201).json({ id: result.insertId, titulo, link, data_publicacao });
  });
});

module.exports = router;
