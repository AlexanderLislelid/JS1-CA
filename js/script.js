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

    card.className = "card";
    img.className = "card-img";
    content.className = "card-content";
    title.className = "card-title";
    price.className = "card-price";
    genre.className = "card-genre";

    img.src = product.image.url;
    img.alt = product.image.alt;
    title.textContent = product.title;
    price.textContent = toNok(product.price);
    genre.textContent = product.genre;
    anchor.href = `product/index.html?id=${product.id}`;

    content.append(title, genre, price);
    card.append(img, content);
    anchor.appendChild(card);

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

    container.appendChild(anchor);
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

//-------------------------Add to cart function
const openCart = document.querySelector(".shopping-cart");
const cart = [];

console.log(openCart);

//legg til spel i arrayet med id og pris? antall?
