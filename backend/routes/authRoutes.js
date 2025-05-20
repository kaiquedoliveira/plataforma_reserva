const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2');


const router = express.Router();

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kaique@08',
    database: 'plataforma_Enem',
});

// 📌 Rota de cadastro
router.post(
    '/register',
    [
        body('nome').isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
        body('email').isEmail().withMessage('Email inválido'),
        body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, email, senha } = req.body;
        const hashedPassword = bcrypt.hashSync(senha, 10);

        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.query(query, [nome, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    }
);

// 📌 Rota de login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email inválido'),
        body('senha').notEmpty().withMessage('Senha é obrigatória'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, senha } = req.body;

        const query = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao realizar login' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

            const usuario = results[0];
            const senhaValida = bcrypt.compareSync(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

            // Geração de token JWT
            const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, 'secreto', {
                expiresIn: '1h'
            });

            res.json({
                message: 'Login bem-sucedido',
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        });
    }
);

module.exports = router;
