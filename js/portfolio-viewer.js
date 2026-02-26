// Portfolio Grid & Modal System

let portfolioData = [];
let currentItemIndex = 0;
let currentMediaIndex = 0;

async function initPortfolio() {
  portfolioData = await loadData("portfolio");
  renderPortfolioGrid();
}

function renderPortfolioGrid() {
  const grid = document.getElementById("portfolio");
  if (!grid) return;

  grid.innerHTML = "";

  portfolioData.forEach((item, index) => {
    const firstMedia = item.media ? item.media[0] : null;
    const thumbUrl = item.thumb || item.src || "assets/images/placeholder.jpg";

    const card = document.createElement("div");
    card.className = "card portfolio-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${item.title}`);

    const imgHtml = `<img src="${thumbUrl}" alt="${item.alt || item.title}" loading="lazy" />`;

    card.innerHTML = `
      ${imgHtml}
      <h3>${item.title}</h3>
      <p>${item.description.substring(0, 60)}...</p>
      <small>Created: ${item.date}</small>
    `;

    card.addEventListener("click", () => openPortfolioModal(item.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPortfolioModal(item.id);
      }
    });

    grid.appendChild(card);
  });
}

function openPortfolioModal(itemId) {
  currentItemIndex = portfolioData.findIndex(item => item.id === itemId);
  currentMediaIndex = 0;
  displayPortfolioModal();
  const modal = document.getElementById("portfolio-modal");
  if (modal) {
    modal.style.display = "flex";
    if (modal.classList) {
      modal.classList.add("active");
    }
  }
}

function displayPortfolioModal() {
  const item = portfolioData[currentItemIndex];
  if (!item) return;

  const media = item.media ? item.media[currentMediaIndex] : null;
  const mediaContainer = document.getElementById("modal-media");

  if (!mediaContainer) return;

  if (!media) {
    mediaContainer.innerHTML = `<img src="${item.src}" alt="${item.title}" class="modal-media" />`;
  } else if (media.type === "image") {
    mediaContainer.innerHTML = `<img src="${media.src}" alt="${media.alt}" class="modal-media" loading="lazy" />`;
  } else if (media.type === "video") {
    mediaContainer.innerHTML = `<video src="${media.src}" controls class="modal-media"></video>`;
  }

  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal-date").textContent = `Created: ${item.date}`;

  const mediaCount = item.media ? item.media.length : 1;
  document.getElementById("media-counter").textContent = `${currentMediaIndex + 1} / ${mediaCount}`;

  // Update button states
  const prevMediaBtn = document.querySelector(".media-nav .nav-btn:first-child");
  const nextMediaBtn = document.querySelector(".media-nav .nav-btn:last-child");

  if (prevMediaBtn) {
    prevMediaBtn.disabled = currentMediaIndex === 0;
  }
  if (nextMediaBtn) {
    nextMediaBtn.disabled = currentMediaIndex === mediaCount - 1;
  }
}

function nextMedia() {
  const item = portfolioData[currentItemIndex];
  const mediaCount = item.media ? item.media.length : 1;

  if (currentMediaIndex < mediaCount - 1) {
    currentMediaIndex++;
    displayPortfolioModal();
  }
}

function prevMedia() {
  if (currentMediaIndex > 0) {
    currentMediaIndex--;
    displayPortfolioModal();
  }
}

function nextItem() {
  if (currentItemIndex < portfolioData.length - 1) {
    currentItemIndex++;
    currentMediaIndex = 0;
    displayPortfolioModal();
  }
}

function prevItem() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
    currentMediaIndex = 0;
    displayPortfolioModal();
  }
}

function closePortfolioModal() {
  const modal = document.getElementById("portfolio-modal");
  if (modal) {
    modal.style.display = "none";
    if (modal.classList) {
      modal.classList.remove("active");
    }
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("portfolio-modal");
  if (modal && (modal.style.display === "flex" || modal.classList.contains("active"))) {
    if (e.key === "ArrowRight") nextMedia();
    if (e.key === "ArrowLeft") prevMedia();
    if (e.key === "ArrowDown") nextItem();
    if (e.key === "ArrowUp") prevItem();
    if (e.key === "Escape") closePortfolioModal();
  }
});

// Click outside modal to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("portfolio-modal");
  if (modal && e.target === modal) {
    closePortfolioModal();
  }
});

// Initialize on load
document.addEventListener("DOMContentLoaded", initPortfolio);