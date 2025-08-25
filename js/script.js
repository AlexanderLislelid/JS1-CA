const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";

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

    img.src = product.image?.url || "";
    img.alt = product.image?.alt || product.title || "Game image";
    title.textContent = product.title ?? "Untitled";
    price.textContent = product.price != null ? `${product.price} €` : "—";
    genre.textContent = product.genre ?? "Unknown";
    anchor.href = `product/index.html?id=${product.id}`;

    content.append(title, price, genre);
    card.append(img, content);
    anchor.appendChild(card);

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
const noFilter = document.getElementById("filter-all");
const actionFilter = document.getElementById("filter-action");
const sportsFilter = document.getElementById("filter-sports");
const adventureFilter = document.getElementById("filter-adventure");
const horrorFilter = document.getElementById("filter-horror");

noFilter.addEventListener("click", () => {
  fetchAndCreateGames();
});
actionFilter.addEventListener("click", () => {
  filterGamesByGenre("action");
});
sportsFilter.addEventListener("click", () => {
  filterGamesByGenre("sports");
});
adventureFilter.addEventListener("click", () => {
  filterGamesByGenre("adventure");
});
horrorFilter.addEventListener("click", () => {
  filterGamesByGenre("horror");
});
