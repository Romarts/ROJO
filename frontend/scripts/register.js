document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const errorDiv = document.getElementById('registerError');

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, cpf, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para o login...");
            window.location.href = 'login.html';
        } else {
            errorDiv.innerText = data.mensagem;
            errorDiv.style.display = 'block';
        }

    } catch (error) {
        errorDiv.innerText = "Erro ao conectar com o servidor. Tente novamente mais tarde.";
        errorDiv.style.display = 'block';
    }
});