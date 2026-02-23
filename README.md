# Marketwins - React

Version React (Vite) du site Marketwins, identique à la version statique en rendu et fonctionnalités.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/` – Composants React et styles
- `src/components/` – Nav, Hero, sections, Footer, VideoModal
- `src/hooks/` – useReveal, useSmoothScroll
- `public/img/` – Images (copiées depuis `img/` à la racine)

L’ancienne version HTML statique est conservée dans `index-static.html` et le CSS d’origine dans `static/style.css` (copie dans `src/index.css`).
