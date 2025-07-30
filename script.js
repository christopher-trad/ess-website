const UserCardTemplate = document.querySelector("[data-user-template]");
const UserCardcontainer = document.querySelector("[user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];
let currentCategory = "all";

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
        mainCategory: user.mainCategory,
        category: user.category,
        element: card
      };
    });
  });

function filterAndDisplay() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  users.forEach(user => {
    const matchesSearch = user.name.includes(searchTerm);
    const matchesCategory = 
      currentCategory === "all" || 
      user.mainCategory === currentCategory || 
      user.category === currentCategory;

    const visible = matchesSearch && matchesCategory;
    user.element.classList.toggle("hide", !visible);
  });
}

searchInput.addEventListener("input", filterAndDisplay);

// Main category click
document.querySelectorAll(".main-category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.getAttribute("data-category");
    document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterAndDisplay();
  });
});

// Subcategory click
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    currentCategory = item.getAttribute("data-category");
    document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));
    const parentDropdown = item.closest(".category-dropdown");
    const mainBtn = parentDropdown.querySelector(".main-category-btn");
    mainBtn.classList.add("active");
    filterAndDisplay();
  });
});
const scrollIcon = document.getElementById("scrollUpIcon");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollIcon.style.display = "block";
    } else {
      scrollIcon.style.display = "none";
    }
  });