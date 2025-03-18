// Função para tratar o login
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio do formulário
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    // Chamada à API para autenticação
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redireciona para a página inicial
      } else {
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    })
    .catch(error => {
      alert('Erro de conexão: ' + error.message);
    });
  });
  
  // Função para tratar o cadastro
  document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio do formulário
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    // Chamada à API para cadastrar o usuário
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html'; // Redireciona para a página de login
      } else {
        alert('Erro no cadastro: ' + data.message);
      }
    })
    .catch(error => {
      alert('Erro de conexão: ' + error.message);
    });
  });
  