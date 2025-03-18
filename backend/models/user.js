const bcrypt = require("bcrypt");

let users = []; // Simulando um "banco de dados" temporário

// Função para criar um usuário
const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(user);
    return user;
};

// Função para encontrar um usuário por e-mail
const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

module.exports = { createUser, findUserByEmail, users };
