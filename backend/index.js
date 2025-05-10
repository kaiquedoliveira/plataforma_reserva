const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Verifique o nome do arquivo
const materiasRoutes = require('./routes/materias');
const conteudosRoutes = require('./routes/conteudos');
const comentariosRoutes = require('./routes/comentarios');
const simuladosRoutes = require('./routes/simulados');
const noticiasRoutes = require('./routes/noticias');
const cursosRoutes = require('./routes/cursos');
const usuariosRoutes = require('./routes/usuarios');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // ESSENCIAL!
app.use('/api/users', userRoutes);  // Esta linha mapeia a rota /api/users para o arquivo de rotas
app.use('/materias', materiasRoutes);
app.use('/conteudos', conteudosRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/simulados', simuladosRoutes);
app.use('/noticias', noticiasRoutes);
app.use('/cursos', cursosRoutes);
app.use('/usuarios', usuariosRoutes);



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
