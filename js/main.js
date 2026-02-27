// ============================================
// Main Site Logic - Active Nav & Global Functions
// ============================================

// Socials data will be loaded dynamically
let socialsData = [];

// Load socials on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadSocials();
  setupModalListeners();
  setActiveNavLink();
});

// Load socials from JSON
async function loadSocials() {
  try {
    const response = await fetch('data/socials.json');
    socialsData = await response.json();
    console.log('✓ Socials loaded successfully', socialsData);
  } catch (error) {
    console.error('✗ Error loading socials:', error);
  }
}

// Setup modal listeners for all icon items AND contact items
function setupModalListeners() {
  // Handle icon-item elements (used on most pages)
  const iconItems = document.querySelectorAll('.icon-item[data-modal]');
  iconItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = item.getAttribute('data-modal');
      openSocialModal(modalId);
    });
  });

  // Handle contact-item elements (used on contact page)
  const contactItems = document.querySelectorAll('.contact-item[data-modal]');
  contactItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = item.getAttribute('data-modal');
      openSocialModal(modalId);
    });
  });

  // Setup close button listener
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  // Close modal when clicking outside (on the dark overlay)
  if (modal) {
    modal.addEventListener('click', (event) => {
      // Only close if clicking directly on the modal overlay, not the content
      if (event.target === modal) {
        closeModal();
      }
    });
  }
}

// Open social modal
function openSocialModal(socialId) {
  const social = socialsData.find(s => s.id === socialId);
  
  if (!social) {
    console.error(`Social with id "${socialId}" not found`);
    return;
  }

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  if (!modal || !modalBody) {
    console.error('Modal elements not found in DOM');
    return;
  }

  const modalContent = `
    <img src="${social.icon}" alt="${social.name}" class="modal-profile-img" loading="lazy">
    <h2 style="color: ${social.color}; text-shadow: 0 0 12px ${social.color}80;">${social.displayName}</h2>
    <p><strong>${social.name}</strong></p>
    <p>${social.username}</p>
    <p style="margin-top: 15px; font-size: 13px; line-height: 1.8;">${social.description}</p>
    <a href="${social.link}" target="_blank" rel="noopener noreferrer" class="btn" style="margin-top: 20px;">
      Visit ${social.name} ↗
    </a>
  `;

  modalBody.innerHTML = modalContent;
  modal.classList.add('active');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  console.log(`✓ Opened modal for: ${social.name}`);
}

// Close modal
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Modal closed');
  }
}

// Set active nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Escape key closes modal
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.getElementById('modal');
    if (modal && (modal.classList.contains('active') || modal.style.display === 'flex')) {
      closeModal();
    }
    
    // Close other modals too
    const gamesModal = document.getElementById('games-modal');
    if (gamesModal && (gamesModal.classList.contains('active') || gamesModal.style.display === 'flex')) {
      closeGameModal();
    }
    
    const portfolioModal = document.getElementById('portfolio-modal');
    if (portfolioModal && (portfolioModal.classList.contains('active') || portfolioModal.style.display === 'flex')) {
      closePortfolioModal();
    }
    
    const projectsModal = document.getElementById('projects-modal');
    if (projectsModal && (projectsModal.classList.contains('active') || projectsModal.style.display === 'flex')) {
      closeProjectModal();
    }
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
    modal.classList.remove("active");
    modal.style.display = "none";
  });
  document.body.style.overflow = 'auto';
}

// ============================================
// Main Site Logic - Active Nav & Global Functions
// ============================================

// Global data loading function
async function loadData(filename) {
  try {
    const response = await fetch(`data/${filename}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`✓ Loaded ${filename}.json:`, data);
    return data;
  } catch (error) {
    console.error(`✗ Error loading ${filename}.json:`, error);
    return [];
  }
}

// Set active navigation link
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  
  console.log(`✓ Current page: ${currentPage}`);
});

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
});

// Utility: Close generic modal
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("active");
  }
}

// Utility: Open social modal
function openSocialModal(socialId) {
  loadData("socials").then(socials => {
    const social = socials.find(s => s.id === socialId);
    if (!social) {
      console.error(`Social with id "${socialId}" not found`);
      return;
    }

    const modalBody = document.getElementById("modal-body");
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="modal-social-content" style="text-align: center;">
          <img src="${social.icon}" alt="${social.name}" class="modal-profile-img" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 15px;">
          <h2>${social.displayName}</h2>
          <p style="color: var(--text-secondary); margin: 10px 0;">${social.username}</p>
          <p style="line-height: 1.7; margin: 15px 0;">${social.description}</p>
          <a href="${social.link}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-block; margin-top: 15px; padding: 10px 25px; background: var(--accent-gold); color: var(--bg-dark); border-radius: 6px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">Visit ${social.name}</a>
        </div>
      `;
    }

    const modal = document.getElementById("modal");
    if (modal) {
      modal.classList.add("active");
      modal.style.display = "flex";
      console.log(`✓ Opened social modal for: ${social.name}`);
    }
  });
}