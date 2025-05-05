const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Verifique o nome do arquivo

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);  // Esta linha mapeia a rota /api/users para o arquivo de rotas

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
