// Game data (edit here for stats)
const gamesData = {
  witcher: { title: "The Witcher 3", cover: "assets/images/witcher.jpg", rating: 9, time: "100 hours", style: "Exploratory", review: "Epic RPG!", link: "https://store.steampowered.com/app/292030" },
  gmod: { title: "Garry's Mod", cover: "assets/images/gmod.jpg", rating: 10, time: "3400 hours", style: "Sandbox", review: "Endless potential for creativity!", link: "https://store.steampowered.com/app/4000/Garrys_Mod/" }
};

function openGameModal(key) {
  const data = gamesData[key];
  document.getElementById("modal-body").innerHTML = `
    <h2><a href="${data.link}" target="_blank">${data.title}</a></h2>
    <img src="${data.cover}" alt="${data.title}" style="width:100%; max-width:300px;">
    <p>Rating: ${'★'.repeat(data.rating)}${'☆'.repeat(10-data.rating)}</p>
    <p>Playtime: ${data.time}</p>
    <p>Playstyle: ${data.style}</p>
    <p>${data.review}</p>
  `;
  document.getElementById("modal").style.display = "block";
}

// Sorting (add to modals.js or here)
document.getElementById("sort").addEventListener("change", sortGames);
function sortGames() {
  const sortBy = document.getElementById("sort").value;
  const grid = document.getElementById("games");
  const cards = Array.from(grid.children);
  cards.sort((a, b) => {
    if (sortBy === "rating") return b.dataset.rating - a.dataset.rating;
    return b.dataset.time - a.dataset.time;
  });
  cards.forEach(card => grid.appendChild(card));
}