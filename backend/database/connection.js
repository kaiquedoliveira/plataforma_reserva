const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Ou o IP do seu servidor de banco de dados
  user: 'root', // Seu usuário do MySQL
  password: 'Kaique@08', // Sua senha do MySQL, caso tenha
  database: 'plataforma_Enem' // O nome do banco de dados que você criou
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

module.exports = connection;
