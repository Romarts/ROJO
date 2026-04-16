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
      const res = await fetch("http://localhost:3000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          senha: password 
        })
      });

      const data = await res.json();

      if (!res.ok) {
        // Ajustado para 'message' para bater com o res.status(401).json({ message: "..." })
        feedback.textContent = data.message || "Erro ao autenticar."; 
        submitBtn.disabled = false;
        submitBtn.textContent = "Entrar";
        return;
      }

      // Salva o Token JWT (Requisito: Armazenar o token no localstorage)
      if (data.token) {
        localStorage.setItem("rojo_token", data.token);
      }
      
      // Salva os dados do usuário (Requisito: Utilizar contexto global)
      // data.user vem do seu AuthController (nome e email)
      localStorage.setItem("rojo_user", JSON.stringify(data.user));
      
      window.location.href = "index.html"; // Redirecionar pra área logada

    } catch (err) {
      feedback.textContent = "Erro de conexão. Tente novamente.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Entrar";
    }
  });
  function logout() {
    // Limpa o Token e os dados do usuário do navegador
    localStorage.removeItem("rojo_token");
    localStorage.removeItem("rojo_user");
    
    alert("Você saiu do sistema.");
    
    // Redireciona para a home para atualizar os menus
    window.location.href = "index.html"; 
}
});
