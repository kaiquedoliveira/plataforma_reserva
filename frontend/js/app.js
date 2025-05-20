document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Erro ao interpretar JSON:', parseError);
      alert('Resposta inválida do servidor.');
      return;
    }

    if (res.ok) {
      alert(data.message || 'Cadastro realizado com sucesso!');
      window.location.href = './login.html';
    } else {
      alert(data.message || 'Erro ao cadastrar');
    }

  } catch (error) {
    alert('Erro de conexão com o servidor.');
    console.error(error);
  }
});
