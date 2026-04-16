// Função para mostrar/esconder senha (mantenha como está)
function toggleVisibilidade(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.classList.add("visible");
    } else {
        input.type = "password";
        btn.classList.remove("visible");
    }
}

// Função de validação de CPF (Algoritmo Oficial)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Evento ÚNICO de envio do formulário
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmarSenha').value;
    const errorDiv = document.getElementById('registerError');

    errorDiv.style.display = 'none';

    // Validação 1: Senha com 8 dígitos (Rubrica)
    if (senha.length < 8) {
        errorDiv.innerText = "A senha deve conter pelo menos 8 dígitos.";
        errorDiv.style.display = 'block';
        return;
    }

    // Validação 2: Senhas iguais (Rubrica)
    if (senha !== confirmar) {
        errorDiv.innerText = "As senhas não coincidem.";
        errorDiv.style.display = 'block';
        return;
    }

    // Validação 3: CPF real (Rubrica)
    if (!validarCPF(cpf)) {
        errorDiv.innerText = "CPF inválido.";
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'login.html';
        } else {
            // AJUSTE AQUI: Mudamos de data.mensagem para data.message
            errorDiv.innerText = data.message || "Erro ao realizar cadastro.";
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.innerText = "Erro ao conectar com o servidor.";
        errorDiv.style.display = 'block';
    }
});