// Get ID from URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

// Load JSON
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const item = data.find(i => i.id === itemId);
    if (!item) {
      document.body.innerHTML = "<h2>Item not found.</h2>";
      return;
    }

    // Fill content
    document.getElementById("title").textContent = item.name;
    document.getElementById("main-image").src = item.image;
    document.getElementById("price").textContent = "price: " + item.price;
    document.getElementById("description").textContent = item.description || "No description.";

    const specsList = document.getElementById("specs");
    specsList.innerHTML = "";
    if (item.specs) {
      item.specs.forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        specsList.appendChild(li);
      });
    }
  });
