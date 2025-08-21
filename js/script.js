const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";
async function fetchAndCreateGames() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const games = data.data;

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
      price.textContent = `${product.price} €`;
      genre.textContent = product.genre;
      anchor.href = `product/index.html?id=${product.id}`;

      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(genre);
      card.appendChild(img);
      card.appendChild(content);
      anchor.appendChild(card);

      container.appendChild(anchor);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchAndCreateGames();
