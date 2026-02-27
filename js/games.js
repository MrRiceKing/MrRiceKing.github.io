// ============================================
// Games Grid & Modal System
// ============================================

let gamesData = [];
let filteredGames = [];
let currentGameIndex = 0;

// Initialize games on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log('🎮 Games.js loaded');
  initGames();
  setupGameModalListeners();
});

function setupGameModalListeners() {
  const modal = document.getElementById("games-modal");
  if (!modal) return;

  // Prevent click on modal content from closing the modal
  const modalContent = modal.querySelector(".games-modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Close modal when clicking the overlay (outside the content)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeGameModal();
    }
  });
}

async function initGames() {
  console.log('🎮 Initializing games...');
  gamesData = await loadData("games");
  console.log('🎮 Games data loaded:', gamesData);
  
  if (!gamesData || gamesData.length === 0) {
    console.error('❌ No games data received!');
    return;
  }
  
  filteredGames = [...gamesData];
  renderGames();
  console.log('✓ Games initialized successfully');
}

function renderGames() {
  const grid = document.getElementById("games");
  console.log('🎮 Rendering games to element:', grid);
  
  if (!grid) {
    console.error('❌ Games grid element not found!');
    return;
  }

  grid.innerHTML = "";

  filteredGames.forEach((game, index) => {
    console.log(`🎮 Creating card for game ${index + 1}:`, game.title);
    
    const card = document.createElement("div");
    card.className = "card game-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${game.title}`);
    card.style.cursor = "pointer";

    const tagColor = game.tags && game.tags.includes("Favorites") ? "#FF6B6B" : 
                     game.tags && game.tags.includes("In Rotation") ? "#FFA500" : "#4FB6FF";
    const primaryTag = game.tags && game.tags.length > 0 ? game.tags[0] : "Gaming";

    card.innerHTML = `
      <div class="card-tag" style="background-color: ${tagColor};">${primaryTag}</div>
      <img src="${game.cover}" alt="${game.title}" loading="eager" onerror="this.src='assets/placeholder-game.jpg'" />
      <h3>${game.title}</h3>
      <p>${game.description || game.playstyle}</p>
      <small>Rating: ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(10 - Math.floor(game.rating))}</small>
    `;

    card.addEventListener("click", () => {
      console.log(`🎮 Clicked game: ${game.title} (id: ${game.id})`);
      openGameModal(game.id);
    });

    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGameModal(game.id);
      }
    });

    grid.appendChild(card);
  });

  console.log(`✓ Rendered ${filteredGames.length} game cards`);
}

function openGameModal(gameId) {
  console.log(`🎮 Opening modal for game id: ${gameId}`);
  console.log(`🎮 Filtered games:`, filteredGames);
  
  currentGameIndex = filteredGames.findIndex(g => g.id === gameId);
  console.log(`🎮 Found game at index: ${currentGameIndex}`);
  
  if (currentGameIndex === -1) {
    console.error(`❌ Game with id "${gameId}" not found in`, filteredGames);
    return;
  }

  displayGameModal();
  
  const modal = document.getElementById("games-modal");
  console.log(`🎮 Modal element:`, modal);
  
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    console.log(`✓ Opened game modal for: ${filteredGames[currentGameIndex].title}`);
  } else {
    console.error('❌ Games modal element not found!');
  }
}

function displayGameModal() {
  const game = filteredGames[currentGameIndex];
  console.log(`🎮 Displaying game:`, game);
  
  if (!game) {
    console.error('❌ Game is undefined!');
    return;
  }

  // Cover image
  const coverEl = document.getElementById("modal-game-cover");
  if (coverEl) {
    coverEl.innerHTML = `<img src="${game.cover}" alt="${game.title}" loading="eager" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;" onerror="this.src='assets/placeholder-game.jpg'" />`;
  } else {
    console.warn('⚠️ modal-game-cover element not found');
  }

  // Title
  const titleEl = document.getElementById("modal-game-title");
  if (titleEl) {
    if (game.link) {
      titleEl.innerHTML = `<a href="${game.link}" target="_blank" rel="noopener noreferrer">${game.title}</a>`;
    } else {
      titleEl.textContent = game.title;
    }
  } else {
    console.warn('⚠️ modal-game-title element not found');
  }

  // Rating
  const ratingEl = document.getElementById("modal-game-rating");
  if (ratingEl) {
    ratingEl.innerHTML = `<p style="color: var(--accent-gold); font-size: 16px; margin: 10px 0;">${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(10 - Math.floor(game.rating))}</p>`;
  } else {
    console.warn('⚠️ modal-game-rating element not found');
  }

  // Playtime
  const timeEl = document.getElementById("modal-game-time");
  if (timeEl) {
    timeEl.textContent = `⏱️ Playtime: ${game.hours || 0} hours`;
    timeEl.style.color = "var(--text-secondary)";
  } else {
    console.warn('⚠️ modal-game-time element not found');
  }

  // Playstyle
  const styleEl = document.getElementById("modal-game-style");
  if (styleEl) {
    styleEl.textContent = `🎮 Style: ${game.playstyle || "Unknown"}`;
    styleEl.style.color = "var(--text-secondary)";
  } else {
    console.warn('⚠️ modal-game-style element not found');
  }

  // Description
  const descEl = document.getElementById("modal-game-description");
  if (descEl) {
    descEl.textContent = game.description || game.review || "No description available.";
    descEl.style.color = "var(--text-primary)";
    descEl.style.marginTop = "15px";
    descEl.style.lineHeight = "1.7";
  } else {
    console.warn('⚠️ modal-game-description element not found');
  }

  // Update button states
  const prevBtn = document.querySelector(".modal-nav .nav-btn-vertical:first-child");
  const nextBtn = document.querySelector(".modal-nav .nav-btn-vertical:last-child");

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
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    console.log("✓ Game modal closed");
  }
}

function filterByTag(tag) {
  console.log(`🎮 Filtering by tag: ${tag}`);
  
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Filter games
  if (tag === "all") {
    filteredGames = [...gamesData];
  } else {
    filteredGames = gamesData.filter(g => g.tags && g.tags.includes(tag));
  }
  
  console.log(`✓ Filtered to ${filteredGames.length} games`);
  renderGames();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("games-modal");
  if (modal && (modal.style.display === "flex" || modal.classList.contains("active"))) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") nextGame();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevGame();
    if (e.key === "Escape") closeGameModal();
  }
});