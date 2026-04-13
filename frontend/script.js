function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " adicionado ao carrinho!");
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