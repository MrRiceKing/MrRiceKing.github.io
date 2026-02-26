// Resources Grid System

let resourcesData = [];
let currentCategory = "all";
let currentSort = "time";

async function initResources() {
  resourcesData = await loadData("resources");
  renderResources();
  setupFilters();
}

function renderResources() {
  const grid = document.getElementById("resources");
  if (!grid) return;

  // Filter
  let filtered = currentCategory === "all" 
    ? [...resourcesData] 
    : resourcesData.filter(r => r.category === currentCategory);

  // Sort
  if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  grid.innerHTML = "";

  filtered.forEach(resource => {
    const card = document.createElement("div");
    card.className = "card resource-card";

    const date = new Date(resource.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    const stars = "★".repeat(Math.floor(resource.rating)) + 
                   (resource.rating % 1 >= 0.5 ? "½" : "") + 
                   "☆".repeat(Math.floor(5 - resource.rating));

    card.innerHTML = `
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <div class="resource-meta">
        <span class="rating">${stars}</span>
        <span class="date">${date}</span>
      </div>
      <a href="${resource.link}" target="_blank" rel="noopener noreferrer" class="btn-link">Visit Resource</a>
    `;

    grid.appendChild(card);
  });
}

function setupFilters() {
  const categorySelect = document.getElementById("category");
  const sortSelect = document.getElementById("sort");

  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      renderResources();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderResources();
    });
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initResources);