const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os conteúdos recomendados
router.get('/', (req, res) => {
  const sql = `
    SELECT conteudos.*, materias.nome AS materia 
    FROM conteudos 
    JOIN materias ON conteudos.id_materia = materias.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar conteúdos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar conteúdos' });
    }
    res.json(results);
  });
});

// Adicionar novo conteúdo recomendado
router.post('/', (req, res) => {
  const { id_materia, titulo, link } = req.body;
  const sql = 'INSERT INTO conteudos (id_materia, titulo, link) VALUES (?, ?, ?)';
  db.query(sql, [id_materia, titulo, link], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar conteúdo:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar conteúdo' });
    }
    res.status(201).json({ id: result.insertId, id_materia, titulo, link });
  });
});

module.exports = router;
