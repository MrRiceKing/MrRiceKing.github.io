# Mr. RiceKing - Personal Portfolio & Gallery

A production-ready portfolio website featuring games, art, projects, and resources with a **Faerie Fire** theme (navy, icy-blue, and gold).

## 🎨 Theme & Design

- **Colors**: Deep navy (#0B1120), Icy Blue (#4FB6FF), Soft Gold (#D4AF37)
- **Typography**: Cinzel (headings), Inter (body)
- **Layout**: Fixed 260px sidebar + responsive main content
- **Background**: Vanta FOG dynamic animation
- **Mobile**: Fully responsive from 320px+

## 🚀 Getting Started

### Local Development

```bash
# Option 1: Live Server (Recommended)
npm install -g live-server
cd path/to/MrRiceKing.github.io
live-server

# Option 2: Python (if installed)
python -m http.server 8000

# Option 3: Node http-server
npm install -g http-server
http-server
```

Then open **http://localhost:8080** (or 8000, 8888 depending on server).

### Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- No build process required—vanilla HTML/CSS/JS

---

## 📂 Project Structure

```
├── index.html              # Home page
├── gamer.html             # Gaming profile
├── portfolio.html         # Art gallery
├── projects.html          # Current projects
├── resources.html         # Recommended tools & tutorials
├── contact.html           # Contact & socials
├── css/
│   └── styles.css         # All styling (Faerie Fire theme)
├── js/
│   ├── main.js            # Core logic, nav, modals
│   ├── vanta-init.js      # Vanta FOG setup
│   ├── portfolio-viewer.js # Portfolio modal system
│   ├── games.js           # Gaming profile logic
│   ├── projects-viewer.js # Projects modal system
│   └── resources-manager.js # Resources filtering
├── data/
│   ├── portfolio.json     # Art portfolio items
│   ├── games.json         # Game data
│   ├── projects.json      # Project data
│   ├── resources.json     # Resource recommendations
│   └── socials.json       # Social media profiles
├── assets/
│   ├── images/            # Portfolio & project images
│   ├── icons/             # Social media icons
│   ├── banners/           # Banner images
│   └── avatars/           # Profile avatars
└── .nojekyll              # GitHub Pages flag
```

---

## ✏️ Editing Content

### Adding Portfolio Items

Edit `data/portfolio.json`:

```json
{
  "id": 4,
  "title": "Your Artwork Title",
  "description": "A detailed description of your artwork (60+ chars recommended).",
  "date": "2024-02-26",
  "thumb": "assets/images/your-image.jpg",
  "src": "assets/images/your-image.jpg",
  "alt": "Alt text for accessibility",
  "media": [
    { "type": "image", "src": "assets/images/your-image.jpg", "alt": "Alt text" },
    { "type": "image", "src": "assets/images/variation.jpg", "alt": "Alt text" }
  ]
}
```

**Key Fields**:
- `id`: Unique number (increment from last)
- `title`: Artwork name (under 50 chars)
- `description`: Full description
- `date`: ISO format (YYYY-MM-DD)
- `thumb` / `src`: Path to image
- `media`: Array of media (image/video). First one displays in grid card

**Save** → Refresh browser → New card appears automatically.

---

### Adding Games

Edit `data/games.json`:

```json
{
  "id": 6,
  "title": "Game Name",
  "cover": "assets/images/game-cover.jpg",
  "username": "YourUsername",
  "link": "https://store.steampowered.com/app/12345",
  "hours": 150,
  "rating": 9,
  "playstyle": "Exploratory Adventure",
  "description": "Why you love this game...",
  "tags": ["Favorites", "Action RPG"]
}
```

**Available Tags**: "Favorites", "In Rotation", "Memorable" (filter by these)

---

### Adding Projects

Edit `data/projects.json`:

```json
{
  "id": 7,
  "title": "Project Name",
  "description": "What this project is about...",
  "priority": "high",
  "cover": "assets/images/project-cover.jpg",
  "link": "https://github.com/yourrepo/project",
  "status": "In Development - 80% Complete",
  "tags": ["Game Dev", "Unity"]
}
```

**Priority Values**: "high" (red), "medium" (orange), "low" (blue)

---

### Adding Resources

Edit `data/resources.json`:

```json
{
  "id": 9,
  "title": "Tool or Course Name",
  "description": "A brief description of what this resource teaches/does.",
  "category": "tools",
  "rating": 5,
  "date": "2024-02-26",
  "link": "https://example.com"
}
```

**Categories**: "tools" or "tutorials"
**Rating**: 1-5 (displays as stars ★☆)

---

### Adding Social Profiles

Edit `data/socials.json`:

```json
{
  "id": "twitch",
  "name": "Twitch",
  "displayName": "Mr. RiceKing",
  "username": "@mrriceking",
  "description": "Watch me game live and create art on stream. Chatting lore and fantasy worlds.",
  "link": "https://twitch.tv/mrriceking",
  "icon": "assets/icons/twitch.png",
  "color": "#6441A4"
}
```

Click social icons on **Home** or **Contact** pages → modal pops with this info.

---

## 🖼️ Image Guidelines

- **Portfolio thumbs**: 400x300px or larger (responsive)
- **Game covers**: 300x400px (portrait)
- **Project covers**: 400x300px (landscape)
- **Social icons**: 50x50px (square)
- **Avatar**: 175x175px (circular)
- **Format**: JPG/PNG (optimize for web)

Place in `assets/images/`, reference in JSON.

---

## 🎯 Features

✅ **Automatic Active Nav**: Click links, sidebar highlights current page (JS-based)  
✅ **Modals**: Click cards → full-screen gallery with arrow navigation  
✅ **Lazy Loading**: Images load on-demand for performance  
✅ **Keyboard Navigation**: Arrow keys, Enter, Escape work in modals  
✅ **Mobile Responsive**: Sidebar collapses, grid adjusts  
✅ **Vanta FOG**: Animated background on all pages  
✅ **Accessibility**: WCAG AA contrast, semantic HTML, ARIA labels  
✅ **No Build Required**: Pure vanilla JS, CSS, HTML  

---

## 🔗 CDN Resources

- **Three.js r134**: For 3D graphics (Vanta dependency)
- **Vanta FOG**: Dynamic background animation
- **Google Fonts**: Cinzel + Inter

All loaded via CDN with integrity hashes.

---

## 🚀 Deployment

### GitHub Pages Auto-Deploy

1. Push to `main` branch
2. GitHub Actions auto-builds
3. Live at `https://mrriceking.github.io`

### Manual Deploy

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

Site updates within 1 minute.

---

## 📋 Checklist: Adding New Content

- [ ] Edit `data/*.json` with new item
- [ ] Add images to `assets/images/`
- [ ] Update paths in JSON to match filenames
- [ ] Test locally with `live-server`
- [ ] Verify modal opens and displays correctly
- [ ] Check mobile responsiveness
- [ ] Commit and push to main branch
- [ ] Confirm live site updates

---

## 🎮 Navigation

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero intro + social links |
| Gamer | `/gamer.html` | Game library + filters |
| Portfolio | `/portfolio.html` | Art gallery with modals |
| Projects | `/projects.html` | Active projects by priority |
| Resources | `/resources.html` | Tool & tutorial recommendations |
| Contact | `/contact.html` | Social links + Discord invite |

**Active Link**: Automatically highlights in sidebar based on current URL.

---

## 🛠️ Customization

### Change Theme Colors

Edit `css/styles.css` `:root` block:

```css
:root {
  --bg-dark: #0B1120;           /* Main bg */
  --highlight-icy: #4FB6FF;     /* Primary accent */
  --accent-gold: #D4AF37;       /* Gold highlights */
  --text-primary: #E6F1FF;      /* Main text */
  --text-secondary: #7FDFFF;    /* Secondary text */
}
```

### Adjust Sidebar Width

In `css/styles.css`, find `.sidebar`:

```css
.sidebar {
  width: 260px;  /* Desktop width */
}

@media (max-width: 900px) {
  .sidebar {
    width: 70px;  /* Mobile collapsed width */
  }
}
```

### Modify Font

Replace Google Fonts import in HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR-FONT:wght@400;600&display=swap" rel="stylesheet">
```

Then update CSS font-family.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check paths in JSON match assets/ folder. Refresh browser cache. |
| Modal won't open | Verify `data/*.json` is valid (use [jsonlint.com](https://jsonlint.com)). Check console for errors. |
| Vanta background black | Ensure JS files load from CDN (check network tab). Try browser refresh. |
| Nav not highlighting | Verify HTML file names match href values (case-sensitive). |
| Mobile sidebar broken | Check viewport meta tag in `<head>`. Clear CSS cache. |

---

## 📞 Support

- Check browser **console** (F12 → Console tab) for errors
- Verify JSON syntax: [jsonlint.com](https://jsonlint.com)
- Ensure image paths are correct
- Test in **multiple browsers** (Chrome, Firefox, Safari)

---

## 📄 License

MIT License (see LICENSE file)

---

**Last Updated**: February 26, 2024  
**Version**: 1.0 / Production Ready