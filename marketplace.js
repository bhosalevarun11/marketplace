const products = [
  {name:"Bhabhi", price:500, time:1},
  {name:"Massage Parlour Girl", price:1200, time:1},
  {name:"Medium-Tier", price:1500, time:1},
  {name:"High-Tier", price:3000, time:1},
  {name:"Russian", price:6000, time:1},
];

let cart = [];

function loadProducts(){
  let html = "";

  products.forEach((p,i)=>{
    html += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>⏱ ${p.time} Hour Service</p>
        <p class="price">₹${p.price}</p>
        <button class="btn" onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });

  document.getElementById("productList").innerHTML = html;
}

/* ================= ADD TO CART ================= */

function addToCart(i){
  let found = cart.find(item => item.index === i);

  if(found){
    found.qty++;
  } else {
    cart.push({
      index:i,
      name:products[i].name,
      price:products[i].price,
      qty:1
    });
  }

  updateCart();
  showToast("🛒 Item added to cart!");
}

/* ================= CART ================= */

function increaseQty(i){
  cart[i].qty++;
  updateCart();
}

function decreaseQty(i){
  cart[i].qty--;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  updateCart();
}

/* ================= UPDATE CART ================= */

function updateCart(){
  let count = 0;
  cart.forEach(i => count += i.qty);
  document.getElementById("count").innerText = count;

  let html = "";
  let total = 0;

  cart.forEach((item,i)=>{
    total += item.price * item.qty;

    html += `
      <div class="cart-item">

        <div class="item-top">
          <span>${item.name}</span>
          <span>₹${item.price}</span>
        </div>

        <div class="qty-control">
          <button onclick="decreaseQty(${i})">-</button>
          <span class="qty">${item.qty}</span>
          <button onclick="increaseQty(${i})">+</button>
        </div>

      </div>
    `;
  });

  html += `<hr><b>Total: ₹${total}</b>`;

  document.getElementById("cartItems").innerHTML = html;
}

/* ================= TOGGLE CART ================= */

function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
  document.querySelector(".cart-overlay").classList.toggle("active");
}

/* ================= CHECKOUT ================= */

function checkout(){
  const msg = document.getElementById("checkoutMsg");

  if(cart.length === 0){
    msg.innerHTML = "⚠️ Cart is empty!";
    msg.style.color = "#f87171";
    return;
  }

  msg.innerHTML = "⏳ Processing your order...";

  setTimeout(() => {

    msg.innerHTML = `
      <div style="font-size:16px; font-weight:600;">
        ✅ Order placed successfully!
      </div>
      <div style="font-size:14px; opacity:0.85; margin-top:6px;">
        📦 Order confirmed
      </div>
    `;

    cart = [];
    updateCart();
    document.getElementById("count").innerText = "0";

    setTimeout(() => {
      msg.innerHTML = "";
    }, 4000);

  }, 1200);
}

/* ================= TOAST ================= */

function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

loadProducts();