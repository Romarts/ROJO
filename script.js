function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " adicionado ao carrinho!");
}

function explorar() {
  document.getElementById("colecao").scrollIntoView({ behavior: "smooth" });
}

function toggleMenu(){
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}