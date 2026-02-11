// Games data - with tags instead of priority
const gamesData = [
  {
    id: 1,
    title: "The Witcher 3",
    description: "An epic open-world RPG with branching narratives, complex characters, and a richly detailed fantasy world. Incredible storytelling and exploration.",
    tags: ["Favorites", "Memorable"],
    cover: "assets/images/witcher.jpg",
    rating: 9,
    time: "100 hours",
    style: "Exploratory",
    review: "One of the greatest RPGs ever made. The side quests are better than most games' main stories.",
    link: "https://store.steampowered.com/app/292030"
  },
  {
    id: 2,
    title: "Garry's Mod",
    description: "A sandbox game that lets you manipulate the Source engine. Create machinima, build contraptions, or play custom game modes made by the community.",
    tags: ["Favorites", "In Rotation"],
    cover: "assets/images/gmod.jpg",
    rating: 10,
    time: "3400 hours",
    style: "Sandbox",
    review: "Endless potential for creativity! Still playing after all these years.",
    link: "https://store.steampowered.com/app/4000/Garrys_Mod/"
  },
  {
    id: 3,
    title: "Hollow Knight",
    description: "A challenging 2D action-adventure game set in a vast interconnected world. Beautiful art style and tight combat mechanics.",
    tags: ["Memorable"],
    cover: "assets/images/hollow-knight.jpg",
    rating: 9,
    time: "45 hours",
    style: "Metroidvania",
    review: "A masterpiece of indie game design. Every boss fight is memorable.",
    link: "https://store.steampowered.com/app/367520"
  },
  {
    id: 4,
    title: "Elden Ring",
    description: "A collaborative open-world action RPG from FromSoftware and George R.R. Martin. Challenging combat with freedom of exploration.",
    tags: ["In Rotation"],
    cover: "assets/images/elden-ring.jpg",
    rating: 9,
    time: "120 hours",
    style: "Action RPG",
    review: "Incredible world design. The difficulty is fair and rewarding.",
    link: "https://store.steampowered.com/app/1245620"
  },
  {
    id: 5,
    title: "Stardew Valley",
    description: "A cozy farming simulation with fishing, mining, and community interaction. Perfect for relaxation.",
    tags: ["In Rotation"],
    cover: "assets/images/stardew.jpg",
    rating: 8,
    time: "200+ hours",
    style: "Simulation",
    review: "Wholesome and addictive. The perfect game to unwind with.",
    link: "https://store.steampowered.com/app/413150"
  }
];

let currentGameIndex = 0;
let filteredGames = [...gamesData];

function openGameModal(gameId) {
  currentGameIndex = filteredGames.findIndex(g => g.id === gameId);
  displayGameModal();
  document.getElementById("games-modal").style.display = "flex";
}

function displayGameModal() {
  const game = filteredGames[currentGameIndex];
  
  document.getElementById("modal-game-cover").innerHTML = 
    `<img src="${game.cover}" alt="${game.title}" class="modal-media">`;
  document.getElementById("modal-game-title").innerHTML = 
    `<a href="${game.link}" target="_blank">${game.title}</a>`;
  document.getElementById("modal-game-rating").textContent = `${'★'.repeat(game.rating)}${'☆'.repeat(10-game.rating)}`;
  document.getElementById("modal-game-time").textContent = `Playtime: ${game.time}`;
  document.getElementById("modal-game-style").textContent = `Style: ${game.style}`;
  document.getElementById("modal-game-review").textContent = game.review;
  document.getElementById("modal-game-description").textContent = game.description;
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
  document.getElementById("games-modal").style.display = "none";
}

function filterByTag(tag) {
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  
  // Filter games
  if (tag === "all") {
    filteredGames = [...gamesData];
  } else {
    filteredGames = gamesData.filter(g => g.tags.includes(tag));
  }
  renderGames();
}

function renderGames() {
  const grid = document.getElementById("games");
  grid.innerHTML = "";
  
  filteredGames.forEach(game => {
    const card = document.createElement("div");
    card.className = "card game-card";
    card.onclick = () => openGameModal(game.id);
    const tagColor = game.tags.includes("Favorites") ? "#FF6B6B" : 
                     game.tags.includes("In Rotation") ? "#FFA500" : "#4FB6FF";
    const primaryTag = game.tags[0];
    card.innerHTML = `
      <div class="card-tag" style="background-color: ${tagColor};">${primaryTag}</div>
      <img src="${game.cover}" alt="${game.title}">
      <h3>${game.title}</h3>
      <p>${game.description.substring(0, 70)}...</p>
      <small>Rating: ${'★'.repeat(game.rating)}${'☆'.repeat(10-game.rating)}</small>
    `;
    grid.appendChild(card);
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("games-modal");
  if (modal && modal.style.display === "flex") {
    if (e.key === "ArrowRight") nextGame();
    if (e.key === "ArrowLeft") prevGame();
    if (e.key === "Escape") closeGameModal();
  }
});

// Click outside modal to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("games-modal");
  if (e.target === modal) closeGameModal();
});

// Initialize on load
document.addEventListener("DOMContentLoaded", renderGames);