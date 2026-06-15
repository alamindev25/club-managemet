# Pratyasha Samaj Kallyan Songstha — Club Management Website

A professional social organization / club management website built with React, Vite, and Tailwind CSS.

## How to Run (Development)

Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173) in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## File Structure

- `src/App.jsx` — Main website code (hero, committee, activities, funds/transactions, donation form, footer)
- `src/index.css` — Tailwind CSS styles
- `tailwind.config.js`, `postcss.config.js`, `vite.config.js` — Configuration files

## Customization

- To edit committee members (names, positions, photos), update the arrays at the top of `src/App.jsx`: `advisors`, `chairman`, `viceAndSecretary`, `otherOfficers`, `executiveMembers`.
- To change fund transactions, edit the `initialTransactions` array.
- To change activities, edit the `activities` array.
- To change color theme values, edit the `C` object at the top of the file.

## License

Add a license of your choice (for example, MIT) or replace this section with your preferred license.

## Contact

Add author/contact information or a project homepage if you want to include it.
