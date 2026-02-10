// Portfolio data structure - each item can have multiple media files
const portfolioData = [
  {
    id: 1,
    title: "Digital Portrait",
    description: "A fantasy character study with intricate details and ethereal lighting.",
    date: "2023-10-15",
    media: [
      { type: "image", src: "assets/images/Celestial-Trivar.png", alt: "Celestial Trivar" },
      { type: "image", src: "assets/images/Ascending-Trivar.png", alt: "Ascending Trivar" },
      { type: "video", src: "assets/videos/Trivar-Process.mp4", alt: "Trivar Process" },
      { type: "audio", src: "assets/audio/Trivar-Theme.mp3", alt: "Trivar Theme" }
    ]
  },
  {
    id: 2,
    title: "Concept Art",
    description: "A sci-fi landscape exploring alien architecture and bioluminescent flora.",
    date: "2023-11-20",
    media: [
      { type: "image", src: "assets/images/Crown-of-Trivar.png", alt: "Crown of Trivar" }
    ]
  }
  // Add more items here
];

let currentItemIndex = 0;
let currentMediaIndex = 0;

function openPortfolioModal(itemId) {
  currentItemIndex = portfolioData.findIndex(item => item.id === itemId);
  currentMediaIndex = 0;
  displayPortfolioModal();
  document.getElementById("portfolio-modal").style.display = "flex";
}

function displayPortfolioModal() {
  const item = portfolioData[currentItemIndex];
  const media = item.media[currentMediaIndex];
  
  const mediaElement = media.type === "image" 
    ? `<img src="${media.src}" alt="${media.alt}" class="modal-media">`
      `<audio src="${media.src}" controls class="modal-media"></audio>`
    : `<video src="${media.src}" controls class="modal-media"></video>`;
  
  document.getElementById("modal-media").innerHTML = mediaElement;
  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal-date").textContent = `Created: ${item.date}`;
  
  // Update navigation indicators
  document.getElementById("media-counter").textContent = `${currentMediaIndex + 1} / ${item.media.length}`;
}

function nextMedia() {
  if (currentMediaIndex < portfolioData[currentItemIndex].media.length - 1) {
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
  document.getElementById("portfolio-modal").style.display = "none";
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("portfolio-modal");
  if (modal && modal.style.display === "flex") {
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
  if (e.target === modal) closePortfolioModal();
});