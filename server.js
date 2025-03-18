const express = require('express');
const cors = require('cors');
const authRoutes = require('./backend/routes/authRoutes');
const questionRoutes = require('./backend/routes/questionRoutes');
const simuladoRoutes = require('./backend/routes/simuladoRoutes');  // Importando rotas de simulados
const resultadoRoutes = require('./backend/routes/resultadoRoutes'); // Importando rotas de resultados
const materiasRoutes = require('./backend/routes/materias');  // Importar a rota de matérias
const db = require('./backend/config/db');  // Conexão com o banco de dados
const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);

// Exemplo de como usar req.user.id em uma rota
app.get('/usuario', (req, res) => {
  const usuarioId = req.user.id;  // Aqui, req é válido
  res.json({ usuarioId });
});

app.use((err, req, res, next) => {
  console.error('Erro detalhado:', err);  // Exibe o erro completo no console
  res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
