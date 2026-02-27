// Games Grid & Modal System

let gamesData = [];
let filteredGames = [];
let currentGameIndex = 0;

async function initGames() {
  gamesData = await loadData("games");
  filteredGames = [...gamesData];
  renderGames();
}

function renderGames() {
  const grid = document.getElementById("games");
  if (!grid) return;

  grid.innerHTML = "";

  filteredGames.forEach((game) => {
    const card = document.createElement("div");
    card.className = "card game-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${game.title}`);

    const tagColor = game.tags && game.tags.includes("Favorites") ? "#FF6B6B" : 
                     game.tags && game.tags.includes("In Rotation") ? "#FFA500" : "#4FB6FF";
    const primaryTag = game.tags && game.tags.length > 0 ? game.tags[0] : "Gaming";

    card.innerHTML = `
      <div class="card-tag" style="background-color: ${tagColor};">${primaryTag}</div>
      <img src="${game.cover}" alt="${game.title}" loading="eager" />
      <h3>${game.title}</h3>
      <p>${game.description || game.playstyle}</p>
      <small>Rating: ${'★'.repeat(game.rating)}${'☆'.repeat(10 - game.rating)}</small>
    `;

    card.addEventListener("click", () => openGameModal(game.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGameModal(game.id);
      }
    });

    grid.appendChild(card);
  });
}

function openGameModal(gameId) {
  currentGameIndex = filteredGames.findIndex(g => g.id === gameId);
  displayGameModal();
  const modal = document.getElementById("games-modal");
  if (modal) {
    modal.style.display = "flex";
    if (modal.classList) {
      modal.classList.add("active");
    }
  }
}

function displayGameModal() {
  const game = filteredGames[currentGameIndex];
  if (!game) return;

  const coverEl = document.getElementById("modal-game-cover");
  if (coverEl) {
    coverEl.innerHTML = `<img src="${game.cover}" alt="${game.title}" loading="eager" />`;
  }

  const titleEl = document.getElementById("modal-game-title");
  if (titleEl) {
    if (game.link) {
      titleEl.innerHTML = `<a href="${game.link}" target="_blank" rel="noopener noreferrer">${game.title}</a>`;
    } else {
      titleEl.textContent = game.title;
    }
  }

  const ratingEl = document.getElementById("modal-game-rating");
  if (ratingEl) {
    ratingEl.textContent = `${'★'.repeat(game.rating)}${'☆'.repeat(10 - game.rating)}`;
  }

  document.getElementById("modal-game-time").textContent = `Playtime: ${game.hours || 0} hours`;
  document.getElementById("modal-game-style").textContent = `Style: ${game.playstyle || "Unknown"}`;

  // Determine description vs review
  const descEl = document.getElementById("modal-game-description");
  if (descEl) {
    descEl.textContent = game.description || game.review || "No description available.";
  }

  // Update button states
  const prevBtn = document.querySelector(".game-nav .nav-btn-vertical:first-child");
  const nextBtn = document.querySelector(".game-nav .nav-btn-vertical:last-child");

  if (prevBtn) prevBtn.disabled = currentGameIndex === 0;
  if (nextBtn) nextBtn.disabled = currentGameIndex === filteredGames.length - 1;
}

function nextGame() {
  if (currentGameIndex < filteredGames.length - 1) {
    currentGameIndex++;
    displayGameModal();
  }
}

function prevGame() {
  if (currentGameIndex > 0) {
    currentGameIndex--;
    displayGameModal();
  }
}

function closeGameModal() {
  const modal = document.getElementById("games-modal");
  if (modal) {
    modal.style.display = "none";
    if (modal.classList) {
      modal.classList.remove("active");
    }
  }
}

function filterByTag(tag) {
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter
  if (tag === "all") {
    filteredGames = [...gamesData];
  } else {
    filteredGames = gamesData.filter(g => g.tags && g.tags.includes(tag));
  }
  renderGames();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("games-modal");
  if (modal && (modal.style.display === "flex" || modal.classList.contains("active"))) {
    if (e.key === "ArrowRight") nextGame();
    if (e.key === "ArrowLeft") prevGame();
    if (e.key === "Escape") closeGameModal();
  }
});

// Click outside to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("games-modal");
  if (modal && e.target === modal) {
    closeGameModal();
  }
});

// Initialize on load
document.addEventListener("DOMContentLoaded", initGames);