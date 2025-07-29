const UserCardTemplate = document.querySelector("[data-user-template]");
const UserCardcontainer = document.querySelector("[user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const categoryButtons = document.querySelectorAll("[data-category]");

let users = [];
let currentCategory = "all";

// Fetch and render user cards from JSON
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
      UserCardcontainer.append(card)
      return {
        name: user.name.toLowerCase(),    // lowercase for case-insensitive search
        image: user.image,
        price: user.price,
        category: user.category,
        element: card
      };
    });
  });

// Unified filter function: filters by search term and category
function filterAndDisplay() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  users.forEach(user => {
    const matchesSearch = user.name.includes(searchTerm);
    const matchesCategory = currentCategory === "all" || user.category === currentCategory;
    const visible = matchesSearch && matchesCategory;
    user.element.classList.toggle("hide", !visible);
  });
}

// Search input event listener
searchInput.addEventListener("input", () => {
  filterAndDisplay();
});

// Category buttons event listeners
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.getAttribute("data-category");
    filterAndDisplay();

    // Toggle active class on buttons
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
users = data.map((user, index) => {
  const card = UserCardTemplate.content.cloneNode(true).children[0];
  card.classList.add('card');
  card.style.animationDelay = `${index * 100}ms`;
  // rest of your code
});
