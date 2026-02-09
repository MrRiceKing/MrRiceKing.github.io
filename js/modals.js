document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close");

  // Modal data for homepage
  const modalData = {
    discord: { username: "@mr.riceking", desc: "Join my community for gaming and art discussions.", link: "https://discord.gg/59fvxyjfKD" },
    snapchat: { username: "MrRiceKing", desc: "Snapchat for quick updates and behind-the-scenes.", link: "https://snapchat.com/add/MrRiceKing-aj" },
    steam: { username: "MrRiceKing", desc: "Add my Steam profile to game with me!", link: "https://steamcommunity.com/id/MrRiceKing" },
    paypal: { username: "@TheRiceKingdom", desc: "Support my work via PayPal.", link: "https://paypal.me/TheRiceKingdom" }
  };

  document.querySelectorAll("[data-modal]").forEach(item => {
    item.addEventListener("click", (e) => {
      const key = e.currentTarget.dataset.modal;
      if (modalData[key]) {
        modalBody.innerHTML = `
          <h2>${key.charAt(0).toUpperCase() + key.slice(1)}</h2>
          <p><strong>Username:</strong> ${modalData[key].username}</p>
          <p>${modalData[key].desc}</p>
          <a href="${modalData[key].link}" target="_blank" class="btn">Visit Profile</a>
        `;
        modal.style.display = "block";
      }
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
});

