# Quick Chess For You
live App :
🌐 https://raagLibr.github.io/rag-chess-trainer/

♟️ Endgame Studio — A chess training app built with React, react-chessboard, chess.js, and Stockfish 19 (WASM). Features a full game mode against an AI engine and 6 endgame practice scenarios. Runs 100% client-side with no backend required.


<img width="1850" height="856" alt="image" src="https://github.com/user-attachments/assets/4373c69c-2cd7-4804-ad58-416282639380" />



Endgame Studio
React chess trainer using react-chessboard, chess.js, Stockfish 19 Lite (single-threaded WebAssembly), and React Router.
Run
```sh
npm install
npm run dev
```
`npm run build` creates `dist/`; `npm run preview` serves the production build. The predev/prebuild script copies the installed Stockfish worker, WASM, and GPL license into `public/stockfish`. Static hosting must rewrite application routes to `index.html` and serve WASM as `application/wasm`.
Routes
`/`: home
`/play`: full chess game as White against Stockfish, with adjustable skill
`/practice`: six endgame cards
`/practice/queen-rook`, `/practice/two-rooks`, `/practice/queen-bishop`, `/practice/queen-knight`, `/practice/queen`, `/practice/rook`
Drag pieces or click source and destination. Legal targets and the last move are highlighted. Pawn promotion supports queen, rook, bishop, and knight. Undo returns to your previous turn; restart resets the initial position. Flipping changes board orientation, not the player's color. Each practice includes both kings and the named White material. Stockfish defends at maximum skill with a 700 ms search budget; it is not a perfect endgame tablebase.
Games are kept in memory and reset on navigation/reload. No backend or account is required. Fonts use Google Fonts with local sans-serif fallbacks.
Engine distribution
Stockfish is GPL-3.0 software. Its copied license is served at `/stockfish/COPYING.txt`. The exact unmodified engine package used here is `stockfish@19.0.1`; corresponding source and build instructions are at https://github.com/nmrugg/stockfish.js/tree/v19.0.1. Preserve the license and comply with GPL source distribution obligations when redistributing the engine.

