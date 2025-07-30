const UserCardTemplate = document.querySelector("[data-user-template]");
const UserCardcontainer = document.querySelector("[user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];
let currentCategory = "all";

// Fetch and render user cards (your original code)
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = UserCardTemplate.content.cloneNode(true).children[0];
      const image = card.querySelector("[data-img]");
      const title = card.querySelector("[data-title]");
      const price = card.querySelector("[data-price]");
      image.src = user.image;
      title.textContent = user.name;
      price.textContent = user.price;
      card.addEventListener("click", () => {
        window.location.href = `item.html?id=${user.id}`;
      });
      UserCardcontainer.append(card);
      return {
        name: user.name.toLowerCase(),
        image: user.image,
        price: user.price,
        category: user.category,
        element: card
      };
    });
  });

// Filter and display function
function filterAndDisplay() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  users.forEach(user => {
    const matchesSearch = user.name.includes(searchTerm);

    // Here we check category equality
    // If user.category equals currentCategory, show it.
    // So "electrical" main category only matches if item.category === "electrical"
    // Otherwise you can customize this logic if you want to match subcategories under a main category
    const matchesCategory = currentCategory === "all" || user.category === currentCategory;


    const visible = matchesSearch && matchesCategory;
    user.element.classList.toggle("hide", !visible);
  });
}

// Search input event listener
searchInput.addEventListener("input", filterAndDisplay);

// Click main category button (same as before)
document.querySelectorAll(".main-category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.getAttribute("data-category");

    // Clear all active buttons
    document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));

    // Activate clicked main button
    btn.classList.add("active");

    filterAndDisplay();
  });
});

// Click dropdown subcategory
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();

    currentCategory = item.getAttribute("data-category");

    // Remove active from all main buttons
    document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));

    // Activate parent main button
    const parentDropdown = item.closest(".category-dropdown");
    const mainBtn = parentDropdown.querySelector(".main-category-btn");
    mainBtn.classList.add("active");

    filterAndDisplay();
  });
});
