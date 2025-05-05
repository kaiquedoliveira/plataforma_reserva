const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

const JWT_SECRET = process.env.JWT_SECRET || 'plataFormaEnem'; // O segredo pode ser movido para o .env

exports.register = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  // Validação do formato do email
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, hash], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email já cadastrado.' });
        }
        return res.status(500).json({ error: err });
      }

      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado.' });

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (!result) return res.status(401).json({ message: 'Senha incorreta.' });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login realizado com sucesso!',
        token,
        usuario: { id: user.id, nome: user.nome, email: user.email }
      });
    });
  });
};
