document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que a página recarregue

    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            senha: senhaInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);  // Salva o token
            window.location.href = 'home.html';         // Redireciona para home
        } else {
            alert('Email ou senha incorretos');
        }
    })
    .catch(err => {
        console.error('Erro ao fazer login:', err);
        alert('Erro ao fazer login.');
    });
});
