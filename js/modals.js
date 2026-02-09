// Modal data
const data = {
    discord: {
        title: 'Discord',
        username: 'MrRiceKing#1234',
        description: 'Join my community server for gaming and art discussions!',
        link: 'https://discord.gg/yourlink'
    },
    snapchat: {
        title: 'Snapchat',
        username: 'mr.riceking',
        description: 'Follow for daily snaps of my gaming and art journey.',
        link: 'https://snapchat.com/add/mr.riceking'
    },
    steam: {
        title: 'Steam',
        username: 'MrRiceKing',
        description: 'Check out my Steam profile for game reviews and achievements.',
        link: 'https://steamcommunity.com/id/MrRiceKing'
    },
    paypal: {
        title: 'PayPal',
        username: 'mr.riceking@paypal.com',
        description: 'Support my work through donations.',
        link: 'https://paypal.me/MrRiceKing'
    },
    // Game platforms
    xbox: {
        title: 'Xbox Live',
        username: 'MrRiceKing',
        description: 'My Xbox profile for console gaming.',
        link: 'https://xbox.com/profile/MrRiceKing'
    },
    battlenet: {
        title: 'Battle.net',
        username: 'MrRiceKing#1234',
        description: 'Blizzard games profile.',
        link: 'https://battle.net/profile/MrRiceKing'
    },
    epic: {
        title: 'Epic Games',
        username: 'MrRiceKing',
        description: 'Epic Games Store profile.',
        link: 'https://epicgames.com/profile/MrRiceKing'
    },
    // Games
    witcher3: {
        title: 'The Witcher 3: Wild Hunt',
        cover: 'assets/covers/witcher3.jpg',
        rating: '★★★★★',
        time: '200 hours',
        playstyle: 'Exploration-focused, completionist',
        review: 'An epic RPG with incredible storytelling and world-building.'
    },
    cyberpunk: {
        title: 'Cyberpunk 2077',
        cover: 'assets/covers/cyberpunk.jpg',
        rating: '★★★★☆',
        time: '150 hours',
        playstyle: 'Role-playing, modded gameplay',
        review: 'Futuristic world with deep customization, despite launch issues.'
    },
    civ6: {
        title: 'Civilization VI',
        cover: 'assets/covers/civ6.jpg',
        rating: '★★★★★',
        time: '300 hours',
        playstyle: 'Competitive, domination victories',
        review: 'Timeless strategy game with endless replayability.'
    },
    // Projects
    project1: {
        title: 'Indie RPG Game',
        cover: 'assets/covers/project1.jpg',
        link: 'https://github.com/MrRiceKing/rpg-game',
        description: 'A fantasy RPG with deep lore and mechanics.'
    },
    project2: {
        title: 'Digital Portrait',
        cover: 'assets/covers/project2.jpg',
        link: null,
        description: 'Commissioned portrait in realistic style.'
    }
};

function openModal(modalId) {
    const modal = document.getElementById('modal');
    const content = modal.querySelector('.modal-content');
    
    const item = data[modalId];
    if (item.link) {
        // Platform modal
        content.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Username:</strong> ${item.username}</p>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" class="btn">Visit</a>
            <button onclick="closeModal()">Close</button>
        `;
    } else if (item.description && !item.review) {
        // Project modal
        content.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.cover}" alt="${item.title}" style="max-width: 100%; border-radius: 8px;">
            <p>${item.description}</p>
            ${item.link ? `<a href="${item.link}" target="_blank" class="btn">View Project</a>` : ''}
            <button onclick="closeModal()">Close</button>
        `;
    } else {
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', () => openModal(icon.dataset.modal));
    });
    
    // Sorting for games
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            const cards = document.querySelectorAll('#games .card');
            cards.forEach(card => {
                card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
            });
        });
    }
    
    // Filtering for resources
    const categorySelect = document.getElementById('category');
    const sortSelectRes = document.getElementById('sort');
    if (categorySelect && sortSelectRes) {
        const filterResources = () => {
            const cat = categorySelect.value;
            const sort = sortSelectRes.value;
            const cards = Array.from(document.querySelectorAll('#resources .card'));
            cards.forEach(card => {
                card.style.display = cat === 'all' || card.dataset.category === cat ? 'block' : 'none';
            });
            if (sort === 'rating') {
                cards.sort((a, b) => parseInt(b.dataset.rating) - parseInt(a.dataset.rating));
            } else {
                cards.sort((a, b) => new Date(b.dataset.time) - new Date(a.dataset.time));
            }
            const container = document.getElementById('resources');
            container.innerHTML = '';
            cards.forEach(card => container.appendChild(card));
        };
        categorySelect.addEventListener('change', filterResources);
        sortSelectRes.addEventListener('change', filterResources);
    }
});