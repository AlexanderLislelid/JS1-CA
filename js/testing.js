<div class="filters">
  <button id="filter-all" class="filter-buttons">
    Show all games
  </button>
  <button id="filter-action" class="filter-buttons">
    action
  </button>
  <button id="filter-sports" class="filter-buttons">
    sports
  </button>
  <button id="filter-adventure" class="filter-buttons">
    adventure
  </button>
  <button id="filter-horror" class="filter-buttons">
    horror
  </button>
</div>;

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
