// GESTÃO DO CARRINHO
function addToCart(nome, preco) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: nome, price: preco });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(nome + " adicionado ao carrinho!");
}

// LOGOUT SEGURO
function logout() {
    localStorage.removeItem("rojo_token");
    localStorage.removeItem("rojo_user");
    window.location.href = "index.html";
}

// CARREGAR PRODUTOS NA VITRINE
async function carregarProdutos() {
    const container = document.getElementById('produtos-container');
    if (!container) return; 

    try {
        // Chamada simples: a rota GET /produtos no seu index.ts não exige login
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();

        container.innerHTML = ""; 

        produtos.forEach(p => {
            container.innerHTML += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${p.imagemUrl || 'img/perfume-placeholder.jpg'}" alt="${p.nome}">
                    </div>
                    <div class="product-info">
                        <small>Fragrância Exclusiva</small>
                        <h3>${p.nome}</h3>
                        <p class="price">R$ ${Number(p.preco).toFixed(2)}</p>
                        <button class="btn-add-cart" onclick="addToCart('${p.nome}', ${p.preco})">Adicionar</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar a vitrine:", error);
    }
}

// Inicializa a coleção
document.addEventListener("DOMContentLoaded", carregarProdutos);

// CONFIGURAÇÃO DA INTERFACE DO USUÁRIO
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("rojo_token");
    const user = JSON.parse(localStorage.getItem("rojo_user") || "{}");
    const loginLink = document.querySelector('a[href="login.html"]');

    if (token && loginLink) {
        // Muda 'Entrar' para 'Perfil'
        loginLink.textContent = "Perfil";
        loginLink.href = "perfil.html"; 

        // Adiciona botão 'Sair' dinamicamente
        const logoutBtn = document.createElement("a");
        logoutBtn.textContent = "Sair";
        logoutBtn.href = "#";
        logoutBtn.style.marginLeft = "15px";
        logoutBtn.onclick = (e) => { e.preventDefault(); logout(); };
        loginLink.parentNode.appendChild(logoutBtn);
    }

    // Link Admin no Footer
    if (user.role === "ADMIN") {
        const footer = document.querySelector("footer") || document.getElementById("footer-placeholder");
        if (footer) {
            const adminLink = document.createElement("a");
            adminLink.href = "admin.html";
            adminLink.textContent = "Painel Administrativo";
            adminLink.style.display = "block";
            adminLink.style.color = "#D4AF37";
            adminLink.style.marginTop = "10px";
            footer.appendChild(adminLink);
        }
    }
    
    carregarProdutos();
});