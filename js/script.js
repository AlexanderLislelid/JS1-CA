const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";
import { toNok } from "./math.js";

function renderGames(games, container) {
  container.innerHTML = "";

  games.forEach((product) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const genre = document.createElement("p");
    const anchor = document.createElement("a");
    const buyNow = document.createElement("div");
    const cartBtn = document.createElement("button");
    const icon = document.createElement("i");

    card.className = "card";
    img.className = "card-img";
    content.className = "card-content";
    title.className = "card-title";
    price.className = "card-price";
    genre.className = "card-genre";
    cartBtn.className = "cart-button";
    icon.className = "fa-solid fa-plus";
    buyNow.className = "btn-container";

    img.src = product.image.url;
    img.alt = product.image.alt;
    title.textContent = product.title;
    price.textContent = toNok(product.price);
    genre.textContent = product.genre;
    anchor.href = `product/index.html?id=${product.id}`;

    anchor.append(img);
    content.append(title, genre, price);
    anchor.append(content);

    buyNow.appendChild(cartBtn);
    cartBtn.appendChild(icon);

    // Add event listener for this card's cart button
    cartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart(product);
    });

    card.append(anchor, buyNow);

    if (product.onSale === true) {
      const salePrice = document.createElement("div");
      const oldPrice = document.createElement("div");

      oldPrice.textContent = toNok(product.price);
      oldPrice.style.textDecoration = "line-through";
      oldPrice.style.color = "#9aa0a6";

      salePrice.textContent = toNok(product.discountedPrice);
      salePrice.className = "sale-price";

      price.textContent = "";
      price.appendChild(oldPrice);
      price.appendChild(salePrice);
    }

    container.appendChild(card);
  });
}

let allGames = [];

async function fetchAndCreateGames() {
  try {
    container.innerHTML = "";
    const response = await fetch(API_URL);
    const data = await response.json();
    const games = data.data;

    allGames = games; // Store games for filtering
    renderGames(games, container);
  } catch (error) {
    console.log(error);
  }
}

fetchAndCreateGames();

//----------------------Sorting function

const filterForm = document.getElementById("filters");
const select = document.getElementById("genre-select");

if (filterForm) {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilter();
  });
}
select.addEventListener("change", applyFilter);

function applyFilter() {
  const chosen = select.value;
  if (chosen === "all") {
    renderGames(allGames, container);
  } else {
    const filtered = allGames.filter(function (game) {
      if (!game.genre) {
        return false;
      }

      if (game.genre.toLowerCase() === chosen.toLowerCase()) {
        return true;
      }

      return false;
    });
    renderGames(filtered, container);
  }
}

//--------Open cart

const showCart = document.querySelector(".show-cart");
const closeCart = document.querySelector(".close-cart");
const cartContainer = document.querySelector(".cart-container");
const cartItems = document.querySelector(".item-list");

showCart.addEventListener("click", () => {
  cartContainer.style.inset = "0 0 0 auto";
});
closeCart.addEventListener("click", () => {
  cartContainer.style.inset = "0 -400px 0 auto";
});

//-------------------------Add to cart function
let cart = [];
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      name: product.title,
      price: product.price,
      img: product.image.url,
    });
  }
  updateCartDisplay();
  cartContainer.style.inset = "0 0 0 auto";
}

function updateCartDisplay() {
  cartItems.textContent = "";

  let sum = 0;

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    const wrapper = document.createElement("div");
    wrapper.classList.add("cart-item");

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;
    img.width = 80;

    const text = document.createElement("p");
    text.textContent = `${product.name} ${toNok(product.price)} x  ${
      product.quantity
    }`;

    wrapper.appendChild(img);
    wrapper.appendChild(text);
    cartItems.appendChild(wrapper);

    sum += product.price * product.quantity;
  }

  const total = document.createElement("p");

  total.classList.add("cart-sum");
  total.textContent = "Total: " + toNok(sum);
  cartItems.appendChild(total);
}
