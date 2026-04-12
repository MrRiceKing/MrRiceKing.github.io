

## 🏰 Legendary Fantasy Portfolio — Build Plan

### Design System
- **Palette**: Deep purples (#1a0a2e), teals (#0d9488), silvers (#c0c0d0), with glowing magical accents and subtle particle/glow effects
- **Typography**: Cinzel (headings — ornamental serif) + Inter (body — clean readability)
- **Ornamental touches**: CSS decorative borders, subtle gradient dividers, glowing hover effects, smooth page transitions with framer-motion
- **Background**: Subtle dark gradient with optional floating particle/star effects

### Navigation — Fantasy Side Drawer
- Collapsible sidebar with fantasy-themed icons (sword, palette, scroll, compass, crystal, envelope)
- Active route highlighted with a magical glow effect
- Collapses to icon-only mini mode; header trigger always visible
- Ornamental frame/border styling on the sidebar

### Page 1: Home / Introduction
- Hero section with your name in large ornamental typography
- Animated subtitle/tagline with a mystical fade-in
- Brief "About Me" bio section with avatar placeholder
- Quick-access contact icon links (GitHub, Discord, etc.)
- Decorative dividers and scroll-down indicator

### Page 2: Gamer Profile
- Filterable game grid by genre (RPG, FPS, Strategy, etc.)
- Each game card: cover image, title, genre badge, personal rating (star system), playtime, and a short review
- Expandable cards or modal for full review text
- Placeholder data structure ready for you to fill in your games

### Page 3: Art Gallery
- Masonry grid layout supporting images, video thumbnails, and audio entries
- Category filter tabs (Art, Video, Audio, All)
- Lightbox overlay on click — images zoom, videos play inline, audio has a styled player
- Upload-ready structure (you add files to public folder or link externally)

### Page 4: Projects
- Card grid of current projects
- Each card: title, description, status badge (Active/Paused/Complete), tech tags, and external link
- Expandable details or modal for longer descriptions
- Ornamental card borders with hover glow

### Page 5: Resources
- Categorized list/grid of tools & software recommendations
- Categories like: Development, Art, Productivity, Gaming, etc.
- Each entry: name, icon/logo placeholder, short description, and external link
- Filter by category

### Page 6: Contact
- All social links displayed as styled icon buttons (GitHub, Twitter/X, YouTube, etc.)
- Prominent Discord server invite with embedded preview/widget styling
- PayPal link/donate button with clear styling
- Optional contact form (client-side, ready for future backend integration)
- Decorative ornamental framing around the contact section

### GitHub Pages Compatibility
- Uses HashRouter instead of BrowserRouter for full GitHub Pages SPA compatibility
- All assets referenced with relative paths
- Vite base config set to `./` for correct asset resolution
- No server-side dependencies — fully static client-side app

### Animations & Polish
- Framer Motion for page transitions and element reveals
- Subtle glow/shimmer effects on interactive elements
- Smooth scroll behavior throughout
- Responsive design — mobile-friendly with drawer navigation

