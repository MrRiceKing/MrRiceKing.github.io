// ============================================
// Portfolio Grid & Modal System
// ============================================

let portfolioData = [];
let currentItemIndex = 0;
let currentMediaIndex = 0;
let filteredPortfolio = [];

async function initPortfolio() {
  portfolioData = await loadData("portfolio");
  setupPortfolioListeners();
  renderPortfolioByCategory();
  console.log('✓ Portfolio initialized', portfolioData);
}

// Render portfolio items organized by category
function renderPortfolioByCategory() {
  const portfolio2d = portfolioData.filter(item => item.category === "2D");
  const portfolio3d = portfolioData.filter(item => item.category === "3D");

  renderPortfolioGrid("portfolio-2d", portfolio2d);
  renderPortfolioGrid("portfolio-3d", portfolio3d);
}

// Render portfolio grid for specific category
function renderPortfolioGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.cursor = "pointer";
    card.onclick = () => openPortfolioModal(item.id);

    const coverImage = item.cover || "assets/placeholder-art.jpg";
    
    card.innerHTML = `
      <img src="${coverImage}" alt="${item.title}" loading="eager">
      <h3>${item.title}</h3>
      <p>${item.summary || item.description?.substring(0, 80) || "Creative work"}</p>
      <small>${item.category} • ${item.year || "2024"}</small>
    `;

    grid.appendChild(card);
  });
}

// Setup portfolio click listeners
function setupPortfolioListeners() {
  const portfolioLinks = document.querySelectorAll('.portfolio-link-item[data-modal]');
  portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = link.getAttribute('data-modal');
      openSocialModal(modalId);
    });
  });
}

// Open portfolio modal
function openPortfolioModal(itemId) {
  const allItems = portfolioData;
  filteredPortfolio = allItems;
  currentItemIndex = allItems.findIndex(item => item.id === itemId);

  if (currentItemIndex === -1) {
    console.error(`Portfolio item with id "${itemId}" not found`);
    return;
  }

  currentMediaIndex = 0;
  displayPortfolioModal();

  const modal = document.getElementById("portfolio-modal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    console.log(`✓ Opened portfolio modal for: ${filteredPortfolio[currentItemIndex].title}`);
  }
}

// Display portfolio modal content
function displayPortfolioModal() {
  const item = filteredPortfolio[currentItemIndex];
  if (!item) return;

  // Handle media (images or videos)
  const mediaContainer = document.getElementById("modal-media");
  if (mediaContainer) {
    mediaContainer.innerHTML = "";

    // Show loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "media-loading";
    loadingIndicator.innerHTML = '<div class="spinner"></div>';
    mediaContainer.appendChild(loadingIndicator);

    const media = item.media && item.media[currentMediaIndex];
    if (media) {
      if (media.includes(".mp4") || media.includes(".webm") || media.includes(".ogg")) {
        // Video element
        const video = document.createElement("video");
        video.src = media;
        video.controls = true;
        video.style.maxWidth = "100%";
        video.style.maxHeight = "100%";
        video.style.objectFit = "contain";
        
        video.addEventListener("loadstart", () => {
          if (loadingIndicator) loadingIndicator.style.display = "flex";
        });
        
        video.addEventListener("canplay", () => {
          if (loadingIndicator) loadingIndicator.style.display = "none";
        });
        
        mediaContainer.appendChild(video);
      } else {
        // Image element
        const img = document.createElement("img");
        img.src = media;
        img.alt = item.title;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        
        img.addEventListener("load", () => {
          if (loadingIndicator && loadingIndicator.parentNode) {
            loadingIndicator.style.display = "none";
          }
        });
        
        img.addEventListener("error", () => {
          if (loadingIndicator) {
            loadingIndicator.innerHTML = '<p style="color: var(--text-secondary);">Failed to load image</p>';
          }
        });
        
        mediaContainer.appendChild(img);
      }
    } else if (item.cover) {
      const img = document.createElement("img");
      img.src = item.cover;
      img.alt = item.title;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.objectFit = "contain";
      
      img.addEventListener("load", () => {
        if (loadingIndicator && loadingIndicator.parentNode) {
          loadingIndicator.style.display = "none";
        }
      });
      
      img.addEventListener("error", () => {
        if (loadingIndicator) {
          loadingIndicator.innerHTML = '<p style="color: var(--text-secondary);">Failed to load image</p>';
        }
      });
      
      mediaContainer.appendChild(img);
    }
  }

  // Update media counter
  const mediaCount = item.media ? item.media.length : 1;
  const counter = document.getElementById("media-counter");
  if (counter) {
    counter.textContent = `${currentMediaIndex + 1} / ${mediaCount}`;
  }

  // Update title and description
  const titleEl = document.getElementById("modal-title");
  if (titleEl) titleEl.textContent = item.title;

  const descEl = document.getElementById("modal-description");
  if (descEl) descEl.textContent = item.description || item.summary || "Creative work";

  // Update details
  const detailsEl = document.getElementById("modal-details");
  if (detailsEl) {
    detailsEl.innerHTML = `
      <div class="portfolio-stats">
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Year:</strong> ${item.year || "2024"}</p>
        ${item.tools ? `<p><strong>Tools:</strong> ${item.tools}</p>` : ""}
        ${item.dimensions ? `<p><strong>Dimensions:</strong> ${item.dimensions}</p>` : ""}
      </div>
    `;
  }

  // Update navigation button states
  const prevBtn = document.querySelector(".item-nav .nav-btn-vertical:first-child");
  const nextBtn = document.querySelector(".item-nav .nav-btn-vertical:last-child");

  if (prevBtn) prevBtn.disabled = currentItemIndex === 0;
  if (nextBtn) nextBtn.disabled = currentItemIndex === filteredPortfolio.length - 1;
}

// Navigate to next portfolio item
function nextPortfolioItem() {
  if (currentItemIndex < filteredPortfolio.length - 1) {
    currentItemIndex++;
    currentMediaIndex = 0;
    displayPortfolioModal();
  }
}

// Navigate to previous portfolio item
function prevPortfolioItem() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
    currentMediaIndex = 0;
    displayPortfolioModal();
  }
}

// Navigate to next media within item
function nextPortfolioMedia() {
  const item = filteredPortfolio[currentItemIndex];
  const mediaCount = item.media ? item.media.length : 1;

  if (currentMediaIndex < mediaCount - 1) {
    currentMediaIndex++;
    displayPortfolioModal();
  }
}

// Navigate to previous media within item
function prevPortfolioMedia() {
  if (currentMediaIndex > 0) {
    currentMediaIndex--;
    displayPortfolioModal();
  }
}

// Close portfolio modal
function closePortfolioModal() {
  const modal = document.getElementById("portfolio-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    console.log("Portfolio modal closed");
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("portfolio-modal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextPortfolioMedia();
  if (e.key === "ArrowLeft") prevPortfolioMedia();
  if (e.key === "ArrowDown") nextPortfolioItem();
  if (e.key === "ArrowUp") prevPortfolioItem();
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", initPortfolio);