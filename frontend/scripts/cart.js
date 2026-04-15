/* =========================================
   LÓGICA DO CARRINHO - ROJO
   ========================================= */

function renderCart() {
    // IMPORTANTE: Verifique se no seu HTML o ID é "cart-list"
    const cartList = document.getElementById("cart-list"); 
    const footerActions = document.getElementById("cart-footer-actions");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (!cartList) return; // Segurança caso o elemento não exista

    cartList.innerHTML = ""; 

    if (cart.length === 0) {
        cartList.innerHTML = "<p style='text-align:center; color:#777; font-style:italic; padding: 40px 0;'>Seu carrinho está vazio.</p>";
        if (footerActions) footerActions.innerHTML = "";
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        
        li.innerHTML = `
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <button class="btn-remove" onclick="removeItem(${index})">Remover</button>
            </div>
            <div class="cart-item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
        `;
        
        cartList.appendChild(li);
        total += product.price;
    });

    // Renderiza o Total e o Botão de Finalizar
    if (footerActions) {
        footerActions.innerHTML = `
            <div class="cart-summary">
                <span class="total-label">Total do Pedido</span>
                <div class="total-value" style="font-size: 24px; color: #1a1a1a; font-weight: bold; margin-bottom: 20px;">
                    R$ ${total.toFixed(2).replace('.', ',')}
                </div>
            </div>
            <button class="btn-three" onclick="checkout()">Finalizar Compra</button>
        `;
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Atualiza a tela na hora
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // 1. Limpa o carrinho
    localStorage.removeItem("cart");

    // 2. Redireciona para a página de sucesso
    window.location.href = "sucesso.html";
}

// Inicializa o carrinho ao carregar a página (apenas uma vez)
document.addEventListener("DOMContentLoaded", renderCart);