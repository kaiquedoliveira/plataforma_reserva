const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Importação de rotas
const userRoutes = require('./routes/userRoutes');
const materiasRoutes = require('./routes/materias');
const conteudosRoutes = require('./routes/conteudos');
const comentariosRoutes = require('./routes/comentarios');
const simuladosRoutes = require('./routes/simulados');
const noticiasRoutes = require('./routes/noticias');
const cursosRoutes = require('./routes/cursos');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação
const verificarToken = require('./middleware/authMiddleware'); // Middleware de autenticação
const testRoutes = require('./routes/testRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/materias', materiasRoutes);
app.use('/conteudos', conteudosRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/simulados', simuladosRoutes);
app.use('/noticias', noticiasRoutes);
app.use('/cursos', cursosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/api/test', testRoutes);
app.use('/api', protectedRoutes); //  rota GET /api/test/protected existe

// ✅ Rota protegida: só acessa se o token for válido
app.get('/api/home', verificarToken, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado à home!' });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
