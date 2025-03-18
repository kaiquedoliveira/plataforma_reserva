const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Importando o middleware de autenticação

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kaique@08',
  database: 'projeto_senai'
});

// Rota de cadastro
router.post('./cadastro/', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.execute(query, [nome, email, hashedPassword], (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco:', err);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// Rota de login
router.post('/login/', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.execute(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao consultar no banco:', err);
      return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
    }
    

    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Verificar senha
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'seu_segredo', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  });
});

// Rota protegida que exige que o usuário esteja autenticado
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}!` });
});

module.exports = router;
