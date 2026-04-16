// Substitua a função do topo por esta:
function addToCart(nome, preco) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Criamos um objeto para que o cart.js consiga ler .name e .price
  const novoProduto = {
    name: nome,
    price: preco
  };
  
  cart.push(novoProduto);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(nome + " adicionado ao carrinho!");
}

function explorar() {
  document.getElementById("colecao").scrollIntoView({ behavior: "smooth" });
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  const btn = document.querySelector(".menu-btn");
  
  menu.classList.toggle("active");
  btn.classList.toggle("open");
}

document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-btn");
    
    menu.classList.remove("active");
    btn.classList.remove("open");
  });
});

async function carregarProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    const produtos = await response.json();

    const container = document.getElementById('produtos-container'); // Use o ID correto do seu HTML
    
    // ESTA É A LINHA QUE RESOLVE A DUPLICAÇÃO:
    container.innerHTML = ""; 

    produtos.forEach(produto => {
        container.innerHTML += `
            <div class="produto-card">
                <img src="${produto.image}" alt="${produto.name}">
                <h3>${produto.name}</h3>
                <p>${produto.description}</p>
                <span>R$ ${produto.price.toFixed(2)}</span>
                <button onclick="addToCart('${produto.name}', ${produto.price})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}
carregarProdutos();