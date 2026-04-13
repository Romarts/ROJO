function renderCart() {
    const cartList = document.getElementById("cart-list");
    const footerActions = document.getElementById("cart-footer-actions");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cartList.innerHTML = ""; 
    footerActions.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<p style='text-align:center; color:#777; font-style:italic;'>Seu carrinho está vazio.</p>";
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
            <div class="cart-item-price">R$ ${product.price.toFixed(2)}</div>
        `;
        
        cartList.appendChild(li);
        total += product.price;
    });

    // Renderiza o Total e o Botão de Finalizar com o estilo do Login
    footerActions.innerHTML = `
        <div class="cart-summary">
            <span class="total-label">Total do Pedido</span>
            <div class="total-value" style="font-size: 24px; color: #1a1a1a; font-weight: bold; margin-bottom: 20px;">
                R$ ${total.toFixed(2)}
            </div>
        </div>
        <button class="btn-three" onclick="checkout()">Finalizar Compra</button>
    `;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    alert("Pedido enviado para processamento!");
}

document.addEventListener("DOMContentLoaded", renderCart);

// Inicializa o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", renderCart);