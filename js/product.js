const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";

async function fetchAndCreateGame() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product id provided";
      return;
    }
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const product = data.data;

    const productDiv = document.createElement("div");
    const img = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const description = document.createElement("p");
    const genre = document.createElement("p");
    const backButton = document.createElement("a");

    productDiv.className = "product-details";
    img.className = "product-image";
    title.className = "product-title";
    price.className = "product-price";
    description.className = "product-description";
    backButton.className = "backbutton";
    genre.className = "product-genre";

    img.src = product.image.url;
    img.alt = product.image.alt;
    title.textContent = product.title;
    price.textContent = `${product.price} €`;
    description.textContent = product.description;
    genre.textContent = product.genre;
    backButton.textContent = "Back to games";
    backButton.href = "../index.html";

    productDiv.appendChild(img);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(genre);
    productDiv.appendChild(description);
    productDiv.appendChild(backButton);

    container.appendChild(productDiv);
  } catch (error) {
    console.log(error);
    container.textContent = "Failed to load product";
  }
}
fetchAndCreateGame();
