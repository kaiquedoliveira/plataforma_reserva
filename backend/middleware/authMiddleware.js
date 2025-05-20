const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // formato: Bearer token_aqui

    if (!token) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    jwt.verify(token, 'secreto', (err, usuario) => {
        if (err) {
            return res.status(403).json({ error: 'Token expirado ou inválido' });
        }

        req.usuario = usuario; // Disponibiliza o usuário para outras rotas
        next();
    });
}

module.exports = verificarToken;
