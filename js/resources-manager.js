// Resources data
const resourcesData = [
  { id: 1, title: "Blender", description: "Industry-standard 3D modeling and animation software. Powerful, free, and open-source.", category: "tools", rating: 5, date: "2023-12-01", link: "https://www.blender.org" },
  { id: 2, title: "Aseprite", description: "Pixel art animation software. Essential for sprite-based game development.", category: "tools", rating: 5, date: "2023-11-15", link: "https://www.aseprite.org" },
  { id: 3, title: "Procreate", description: "Digital painting app for iPad. Intuitive and feature-rich for character design.", category: "tools", rating: 4, date: "2023-10-20", link: "https://procreate.art" },
  { id: 4, title: "Game Dev Complete Course", description: "Comprehensive video course covering game design, development, and publishing.", category: "tutorials", rating: 5, date: "2023-09-10", link: "https://www.udemy.com" },
  { id: 5, title: "Fantasy Worldbuilding Guide", description: "Deep dive into creating believable fantasy worlds with culture, geography, and history.", category: "tutorials", rating: 4, date: "2023-08-05", link: "https://example.com" },
  { id: 6, title: "Digital Art Fundamentals", description: "Learn the basics of digital art from color theory to composition.", category: "tutorials", rating: 4, date: "2023-07-22", link: "https://example.com" },
  { id: 7, title: "Three.js Documentation", description: "Comprehensive docs and examples for Three.js 3D JavaScript library. Essential for web-based 3D graphics and interactive experiences.", category: "tools", rating: 5, date: "2023-06-15", link: "https://threejs.org" },
  { id: 8, title: "Character Animation Masterclass", description: "Advanced techniques for bringing characters to life through keyframe animation, rigging, and motion capture interpretation.", category: "tutorials", rating: 4, date: "2023-05-30", link: "https://www.youtube.com" }
];

let currentCategory = "all";
let currentSort = "time";

function renderResources() {
  const grid = document.getElementById("resources");
  grid.innerHTML = "";
  
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
  
  // Render
  filtered.forEach(resource => {
    const card = document.createElement("div");
    card.className = "card resource-card";
    card.innerHTML = `
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <div class="resource-meta">
        <span class="rating">${'★'.repeat(resource.rating)}${'☆'.repeat(5-resource.rating)}</span>
        <span class="date">${new Date(resource.date).toLocaleDateString()}</span>
      </div>
      <a href="${resource.link}" target="_blank" class="btn-link">Visit</a>
    `;
    grid.appendChild(card);
  });
}

// Filter by category
document.addEventListener("DOMContentLoaded", () => {
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
  
  renderResources();
});

async function loadData(filename) {
  const response = await fetch(`data/${filename}.json`);
  return await response.json();
}

// Then in your viewers:
let projectsData = [];
document.addEventListener("DOMContentLoaded", async () => {
  projectsData = await loadData("projects");
  renderProjects();
});