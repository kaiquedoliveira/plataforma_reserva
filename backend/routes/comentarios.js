const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os comentários de uma matéria específica
router.get('/:id_materia', (req, res) => {
  const { id_materia } = req.params;
  const sql = `
    SELECT comentarios.*, usuarios.nome AS usuario
    FROM comentarios
    JOIN usuarios ON comentarios.id_usuario = usuarios.id
    WHERE comentarios.id_materia = ?
  `;
  db.query(sql, [id_materia], (err, results) => {
    if (err) {
      console.error('Erro ao buscar comentários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar comentários' });
    }
    res.json(results);
  });
});

// Adicionar um novo comentário
router.post('/', (req, res) => {
  const { id_usuario, id_materia, texto } = req.body;
  const sql = 'INSERT INTO comentarios (id_usuario, id_materia, texto) VALUES (?, ?, ?)';
  db.query(sql, [id_usuario, id_materia, texto], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar comentário:', err);
      return res.status(500).json({ erro: 'Erro ao adicionar comentário' });
    }
    res.status(201).json({ id: result.insertId, id_usuario, id_materia, texto });
  });
});

module.exports = router;
