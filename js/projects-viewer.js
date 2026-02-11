// Projects data - categorized by priority
const projectsData = [
  {
    id: 1,
    title: "Indie Game RPG",
    description: "A turn-based RPG with deep character customization, branching narratives, and a unique magic system. Set in a fantasy world inspired by Celtic mythology.",
    priority: "high",
    cover: "assets/images/project-game.jpg",
    link: "https://github.com/yourrepo/game-rpg",
    status: "In Development - 40% Complete"
  },
  {
    id: 2,
    title: "Digital Art Series",
    description: "A collection of interconnected digital paintings exploring themes of identity and transformation through fantasy character studies.",
    priority: "high",
    cover: "assets/images/project-art.jpg",
    link: "",
    status: "Ongoing"
  },
  {
    id: 3,
    title: "Community Discord Bot",
    description: "A custom Discord bot with moderation tools, game utilities, and interactive features for my gaming community.",
    priority: "medium",
    cover: "assets/images/project-bot.jpg",
    link: "https://github.com/yourrepo/discord-bot",
    status: "In Development - 60% Complete"
  },
  {
    id: 4,
    title: "Texture Pack Creation",
    description: "Custom texture packs for various games, blending realistic and fantasy aesthetics.",
    priority: "medium",
    cover: "assets/images/project-textures.jpg",
    link: "",
    status: "Planning Phase"
  },
  {
    id: 5,
    title: "Portfolio Website Expansion",
    description: "Adding advanced features to this website including project showcases, blog section, and commission booking system.",
    priority: "low",
    cover: "assets/images/project-web.jpg",
    link: "https://github.com/yourrepo/portfolio",
    status: "In Development"
  }
];

let currentProjectIndex = 0;

function openProjectModal(projectId) {
  currentProjectIndex = projectsData.findIndex(p => p.id === projectId);
  displayProjectModal();
  document.getElementById("projects-modal").style.display = "flex";
}

function displayProjectModal() {
  const project = projectsData[currentProjectIndex];
  const priorityColor = project.priority === "high" ? "#FF6B6B" : 
                        project.priority === "medium" ? "#FFA500" : "#4FB6FF";
  
  document.getElementById("modal-project-cover").innerHTML = 
    `<img src="${project.cover}" alt="${project.title}" class="modal-media" style="width:100%; height:400px; object-fit:cover; border-radius:10px;">`;
  document.getElementById("modal-project-title").textContent = project.title;
  document.getElementById("modal-project-priority").textContent = project.priority.toUpperCase();
  document.getElementById("modal-project-priority").style.color = priorityColor;
  document.getElementById("modal-project-description").textContent = project.description;
  document.getElementById("modal-project-status").textContent = `Status: ${project.status}`;
  
  const linkBtn = document.getElementById("modal-project-link");
  if (project.link) {
    linkBtn.style.display = "inline-block";
    linkBtn.href = project.link;
  } else {
    linkBtn.style.display = "none";
  }
}

function nextProject() {
  if (currentProjectIndex < projectsData.length - 1) {
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
  document.getElementById("projects-modal").style.display = "none";
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("projects-modal");
  if (modal && modal.style.display === "flex") {
    if (e.key === "ArrowRight") nextProject();
    if (e.key === "ArrowLeft") prevProject();
    if (e.key === "Escape") closeProjectModal();
  }
});

// Click outside modal to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("projects-modal");
  if (e.target === modal) closeProjectModal();
});