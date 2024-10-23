// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const categoryFilter = document.getElementById("categoryFilter");
  let products = [];

  function renderProducts(productsToRender) {
    productList.innerHTML = ""; // clear the list before rendering
    productsToRender.forEach((product) => {
      const productCard = `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
              </div>
            </div>
          </div>
        `;

      productList.insertAdjacentHTML("beforeend", productCard);
    });
  }

  // Загрузка данных с API
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
      populateCategories(products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  function populateCategories(products) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryFilter.appendChild(option);
    });
  }

  categoryFilter.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    const filteredProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);
    renderProducts(filteredProducts);
  });

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
  });
});
