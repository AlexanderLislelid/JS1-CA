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

async function fetchAndCreateGames() {
  try {
    container.innerHTML = "";
    const response = await fetch(API_URL);
    const data = await response.json();
    const games = data.data;

    renderGames(games, container);
  } catch (error) {
    console.log(error);
  }
}

fetchAndCreateGames();

//----------------------Sorting function

function filterGamesByGenre(selectedGenre) {
  fetchAndCreateFilteredGames(selectedGenre);
}

async function fetchAndCreateFilteredGames(selectedGenre) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const games = data.data;

    const filteredGames = games.filter(
      (game) => game.genre?.toLowerCase() === selectedGenre.toLowerCase()
    );

    renderGames(filteredGames, container);
  } catch (error) {
    console.log(error);
  }
}

let filterHeading = document.getElementById("filter-heading");

filterHeading.textContent = "";

const noFilter = document.getElementById("filter-all");
const actionFilter = document.getElementById("filter-action");
const sportsFilter = document.getElementById("filter-sports");
const adventureFilter = document.getElementById("filter-adventure");
const horrorFilter = document.getElementById("filter-horror");

noFilter.addEventListener("click", () => {
  fetchAndCreateGames();
  filterHeading.textContent = "All Games";
});
actionFilter.addEventListener("click", () => {
  filterGamesByGenre("action");
  filterHeading.textContent = "Action";
});
sportsFilter.addEventListener("click", () => {
  filterGamesByGenre("sports");
  filterHeading.textContent = "Sports";
});
adventureFilter.addEventListener("click", () => {
  filterGamesByGenre("adventure");
  filterHeading.textContent = "Adventure";
});
horrorFilter.addEventListener("click", () => {
  filterGamesByGenre("horror");
  filterHeading.textContent = "Horror";
});

//-------------------------Cart
