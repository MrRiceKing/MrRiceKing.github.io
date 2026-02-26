// ============================================
// Main Site Logic - Active Nav & Global Functions
// ============================================

// Automatic Active Link Highlight
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    const linkPage = linkHref.split("/").pop();
    
    if (linkPage === currentPage || 
        (currentPage === "" && linkHref === "index.html")) {
      link.classList.add("active");
    }
  });
});

// Keyboard accessibility - close modals with Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

// Close all modals
function closeAllModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (modal.classList) {
      modal.classList.remove("active");
    }
    modal.style.display = "none";
  });
}

// Click outside modal to close (with class-based check)
window.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Generic fetch with caching
const dataCache = {};

async function loadData(filename) {
  if (dataCache[filename]) {
    return dataCache[filename];
  }

  try {
    const response = await fetch(`data/${filename}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}.json`);
    }
    const data = await response.json();
    dataCache[filename] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}.json:`, error);
    return [];
  }
}

// Trigger data load and initialize social modals
document.addEventListener("DOMContentLoaded", async () => {
  initializeSocialModals();
});

// Social Modal System
function initializeSocialModals() {
  const modalElements = document.querySelectorAll("[data-modal]");
  
  modalElements.forEach(element => {
    element.addEventListener("click", async (e) => {
      e.preventDefault();
      const socialId = element.getAttribute("data-modal");
      await openSocialModal(socialId);
    });
  });
}

async function openSocialModal(socialId) {
  const socials = await loadData("socials");
  const social = socials.find(s => s.id === socialId);

  if (!social) {
    console.warn(`Social ${socialId} not found`);
    return;
  }

  const modalBody = document.getElementById("modal-body");
  const modal = document.getElementById("modal");

  if (!modalBody || !modal) {
    console.error("Modal elements not found");
    return;
  }

  modalBody.innerHTML = `
    <img src="${social.icon}" alt="${social.name}" class="modal-profile-img" />
    <h2>${social.displayName}</h2>
    <p><strong>${social.username}</strong></p>
    <p>${social.description}</p>
    <a href="${social.link}" target="_blank" class="btn">Click to go to ${social.name}</a>
  `;

  modal.style.display = "flex";
  if (modal.classList) {
    modal.classList.add("active");
  }
}

// Close generic modal
const closeBtn = document.querySelector(".close");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "none";
      if (modal.classList) {
        modal.classList.remove("active");
      }
    }
  });
}