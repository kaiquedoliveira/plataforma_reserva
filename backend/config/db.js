const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kaique@08', 
  database: 'projeto_senai',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

module.exports = pool.promise();
