// Projects Grid & Modal System

let projectsData = [];
let filteredProjects = [];
let currentProjectIndex = 0;

async function initProjects() {
  projectsData = await loadData("projects");
  filteredProjects = [...projectsData];
  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById("projects");
  if (!grid) return;

  grid.innerHTML = "";

  filteredProjects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "card project-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${project.title}`);

    const priorityColor = project.priority === "high" ? "#FF6B6B" : 
                          project.priority === "medium" ? "#FFA500" : "#4FB6FF";

    card.innerHTML = `
      <div class="card-priority" style="background-color: ${priorityColor};">${(project.priority || "low").toUpperCase()}</div>
      <img src="${project.cover}" alt="${project.title}" loading="lazy" />
      <h3>${project.title}</h3>
      <p>${project.description.substring(0, 70)}...</p>
      <small>${project.status || "In Development"}</small>
    `;

    card.addEventListener("click", () => openProjectModal(project.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(project.id);
      }
    });

    grid.appendChild(card);
  });
}

function openProjectModal(projectId) {
  currentProjectIndex = filteredProjects.findIndex(p => p.id === projectId);
  displayProjectModal();
  const modal = document.getElementById("projects-modal");
  if (modal) {
    modal.style.display = "flex";
    if (modal.classList) {
      modal.classList.add("active");
    }
  }
}

function displayProjectModal() {
  const project = filteredProjects[currentProjectIndex];
  if (!project) return;

  const coverEl = document.getElementById("modal-project-cover");
  if (coverEl) {
    coverEl.innerHTML = `<img src="${project.cover}" alt="${project.title}" loading="lazy" />`;
  }

  const priorityColor = project.priority === "high" ? "#FF6B6B" : 
                        project.priority === "medium" ? "#FFA500" : "#4FB6FF";

  document.getElementById("modal-project-title").textContent = project.title;
  document.getElementById("modal-project-priority").textContent = (project.priority || "low").toUpperCase();
  document.getElementById("modal-project-priority").style.color = priorityColor;
  document.getElementById("modal-project-description").textContent = project.description;
  document.getElementById("modal-project-status").textContent = `Status: ${project.status || "In Development"}`;

  const linkBtn = document.getElementById("modal-project-link");
  if (project.link) {
    linkBtn.style.display = "inline-block";
    linkBtn.href = project.link;
  } else {
    linkBtn.style.display = "none";
  }

  // Update button states
  const prevBtn = document.querySelector(".project-nav .nav-btn-vertical:first-child");
  const nextBtn = document.querySelector(".project-nav .nav-btn-vertical:last-child");

  if (prevBtn) prevBtn.disabled = currentProjectIndex === 0;
  if (nextBtn) nextBtn.disabled = currentProjectIndex === filteredProjects.length - 1;
}

function nextProject() {
  if (currentProjectIndex < filteredProjects.length - 1) {
    currentProjectIndex++;
    displayProjectModal();
  }
}

function prevProject() {
  if (currentProjectIndex > 0) {
    currentProjectIndex--;
    displayProjectModal();
  }
}

function closeProjectModal() {
  const modal = document.getElementById("projects-modal");
  if (modal) {
    modal.style.display = "none";
    if (modal.classList) {
      modal.classList.remove("active");
    }
  }
}

function filterByPriority(priority) {
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Filter
  if (priority === "all") {
    filteredProjects = [...projectsData];
  } else {
    filteredProjects = projectsData.filter(p => p.priority === priority);
  }
  renderProjects();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("projects-modal");
  if (modal && (modal.style.display === "flex" || modal.classList.contains("active"))) {
    if (e.key === "ArrowRight") nextProject();
    if (e.key === "ArrowLeft") prevProject();
    if (e.key === "Escape") closeProjectModal();
  }
});

// Click outside to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("projects-modal");
  if (modal && e.target === modal) {
    closeProjectModal();
  }
});

// Initialize on load
document.addEventListener("DOMContentLoaded", initProjects);