function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let list = document.getElementById("cart-list");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.className = "cart-item";

    let span = document.createElement("span");
    span.textContent = item;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.className = "btn remove";
    removeBtn.onclick = () => removeItem(index);

    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  alert("Compra finalizada com sucesso!");
  localStorage.removeItem("cart");
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
