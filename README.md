# 💜 Amisha — A Digital Memory

A deeply emotional, cinematic React website — a goodbye letter hidden inside design and animation.

---

## 🚀 How to Run

### Prerequisites
Make sure you have **Node.js** (v16+) installed. Download from https://nodejs.org

### Steps

```bash
# 1. Open terminal in this folder
cd amisha-website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

The website opens at **http://localhost:3000** 🎉

---

## 🖼️ How to Add Your Photos & Videos

Open `src/App.jsx` and search for comments like:

```
{/* ── REPLACE WITH <img src="..."> ── */}
{/* ── REPLACE WITH <video> or <img> ── */}
```

### To add a photo:
1. Put your image in the `public/` folder (e.g. `public/amisha1.jpg`)
2. Replace the placeholder `<div className="photo-placeholder">...</div>` with:
```jsx
<img src="/amisha1.jpg" alt="memory" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
```

### To add a video:
```jsx
<video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: "16px" }}>
  <source src="/memory.mp4" type="video/mp4" />
</video>
```

### Hero circular photo:
Find `<div className="hero-photo-ring">` and replace the placeholder with:
```jsx
<img src="/hero.jpg" alt="Amisha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```

---

## 📁 Project Structure

```
amisha-website/
├── public/
│   └── index.html          ← HTML shell (don't edit)
├── src/
│   ├── App.jsx             ← All scenes, content & components
│   ├── App.css             ← All styles & animations
│   └── index.js            ← React entry point
├── package.json
└── README.md
```

---

## 🎨 Scenes in Order

1. **Hero** — Amisha's name, circular photo, floating particles
2. **First Glance** — Eye-contact art, office photo slot
3. **Office Days** — Memory cards + animated desk SVG
4. **Morning Check-In** — Animated office floor plan
5. **Unspoken Words** — Floating unsent chat bubbles
6. **Birthday** — Snapchat birthday card scene
7. **Sky-Blue Shirt** — SVG shirt + photo placeholder
8. **What Could've Been** — Imagined vs real memory cards
9. **Goodbye** — Cinematic ending with final lines

---

## 💡 Tips

- All placeholder boxes are clearly labeled — just replace them with `<img>` or `<video>` tags
- The side navigation dots auto-highlight the current scene as you scroll
- Custom cursor glow follows your mouse on desktop
- All animations trigger on scroll — each section fades in as you reach it

---

*Made with quiet feelings — 2025*
