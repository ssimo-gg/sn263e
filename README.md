# Simone Nalli — Portfolio V1

Portfolio personale costruito con HTML5 semantico, CSS3 e JavaScript ES6+ modulare.  
Nessun framework, nessuna libreria CSS. Zero dipendenze runtime.

---

## Stack

| Layer | Tecnologia |
|-------|-----------|
| Markup | HTML5 semantico (BEM) |
| Stile | CSS3 — Custom Properties, Grid, Flexbox |
| Script | JavaScript ES6+ modulare (4 file, nessun bundler) |
| Font | Google Fonts via CDN (`preconnect`) |
| Icone | SVG inline |
| Deploy | GitHub Pages |

---

## Struttura

```
portfolio-v1/
├── index.html              # Home — Hero, About, Percorso, Progetti preview
├── portfolio.html          # Archivio progetti con filtro per categoria
├── contacts.html           # Form contatto + Social grid
├── 404.html                # Pagina errore con CTA recovery
├── css/
│   └── style.css           # Monolite BEM — token, componenti, utility, temi
├── js/
│   ├── main.js             # Theme switcher, page transitions, mobile nav
│   ├── home.js             # Skill bar gradient interpolation
│   ├── portfolio.js        # Category filter + ARIA state
│   └── contacts.js         # Form validation + mock submit
└── assets/
    └── svgs/
        └── portfolio-logo.svg
```

---

## Funzionalità

- **Mobile nav** — hamburger accessibile con `aria-expanded` e chiusura al click link
- **Portfolio filter** — filtra per categoria (Web / App / All) con transizione opacity
- **Skill bars** — colore interpolato dinamicamente da grigio a verde neon
- **Contact form** — validazione nativa HTML5 + stati idle / loading / success
- **Timeline** — percorso formativo con marcatori SVG-free
- **Certificazioni** — grid placeholder pronto per futuri inserimenti

---

## Accessibilità

- Focus indicator visibile (`2px solid var(--accent-main)`) su tutti gli elementi interattivi
- `aria-pressed` su bottoni filtro
- `role="progressbar"` con `aria-valuenow/min/max` sulle skill bar
- `aria-busy` sul submit durante loading

---
