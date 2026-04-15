// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const feedback = document.getElementById("feedback");
  const toggle = document.getElementById("togglePwd");
  const pwd = document.getElementById("password");

  toggle.addEventListener("click", () => {
    const type = pwd.type === "password" ? "text" : "password";
    pwd.type = type;
    toggle.textContent = type === "password" ? "👁️" : "🙈";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    const email = document.getElementById("email").value.trim();
    const password = pwd.value;

    if (!email || !password) {
      feedback.textContent = "Preencha e‑mail e senha.";
      return;
    }

    // Validação simples de e-mail
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      feedback.textContent = "E‑mail inválido.";
      return;
    }

    // Desabilita botão enquanto processa
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Entrando...";

  try {
      const res = await fetch("http://localhost:3000/login", { // Ajuste 1: URL completa
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          senha: password // Ajuste 2: 'senha' para bater com o Backend
        })
      });

      const data = await res.json();

      if (!res.ok) {
        feedback.textContent = data.mensagem || "Erro ao autenticar."; 
        submitBtn.disabled = false;
        submitBtn.textContent = "Entrar";
        return;
      }

        if (data.token) {
        localStorage.setItem("rojo_token", data.token);
      }
      localStorage.setItem("rojo_user", JSON.stringify({ email }));
      window.location.href = "index.html";
    } catch (err) {
      feedback.textContent = "Erro de conexão. Tente novamente.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Entrar";
    }
  });
});
