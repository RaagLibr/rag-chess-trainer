# Quick Chess For You
live App :
🌐🔗 https://raagLibr.github.io/rag-chess-trainer/

♟️ Endgame Studio — A chess training app built with React, react-chessboard, chess.js, and Stockfish 19 (WASM). Features a full game mode against an AI engine and 6 endgame practice scenarios. Runs 100% client-side with no backend required.


<img width="1850" height="856" alt="image" src="https://github.com/user-attachments/assets/4373c69c-2cd7-4804-ad58-416282639380" />


# Endgame Studio

A React chess trainer. Play a full game against Stockfish, or practice six classic checkmate endgames, all in the browser with no backend and no account.

Built with **react-chessboard**, **chess.js**, **Stockfish 19 Lite** (single-threaded WebAssembly) and **React Router**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [How to Play](#how-to-play)
- [Practice Endgames](#practice-endgames)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Engine Distribution and License](#engine-distribution-and-license)

---

## Features

- Full game as White against Stockfish, with adjustable skill level
- Six checkmate practice drills, each with the named White material and both kings
- Drag-and-drop or click-to-move, with legal targets and the last move highlighted
- Pawn promotion to queen, rook, bishop or knight
- Undo, flip board and restart controls
- Runs entirely client-side: no backend, no account required
- Games are kept in memory and reset on navigation or reload

## Tech Stack

| Area | Technology |
|---|---|
| UI | React, React Router |
| Build tool | Vite |
| Chess rules | chess.js |
| Board | react-chessboard |
| Engine | Stockfish 19 Lite (single-threaded WebAssembly, in a Web Worker) |
| Fonts | Google Fonts, with local sans-serif fallbacks |

## Getting Started

```sh
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the automated tests |

The `predev` and `prebuild` scripts copy the installed Stockfish worker, WASM file and GPL license into `public/stockfish`.

## Routes

| Route | Description |
|---|---|
| `/` | Home |
| `/play` | Full chess game as White against Stockfish, with adjustable skill |
| `/practice` | Six endgame cards |
| `/practice/queen-rook` | Queen + Rook checkmate |
| `/practice/two-rooks` | Two Rooks checkmate |
| `/practice/queen-bishop` | Queen + Bishop checkmate |
| `/practice/queen-knight` | Queen + Knight checkmate |
| `/practice/queen` | Queen checkmate |
| `/practice/rook` | Rook checkmate |

## How to Play

- **Move a piece:** drag it, or click the source square and then the destination.
- **Highlights:** legal targets and the last move are highlighted.
- **Promotion:** choose queen, rook, bishop or knight.
- **Undo:** returns to your previous turn.
- **Restart:** resets the initial position.
- **Flip:** changes the board orientation only, not your color. You always play White.

## Practice Endgames

Each practice position includes both kings and the named White material. Stockfish defends at maximum skill with a 700 ms search budget.

> **Note:** Stockfish is not a perfect endgame tablebase, so its defense may not always be optimal.

## Project Structure

```
src/
  App.jsx, main.jsx          Router, header and footer
  pages/                     Home, Play, Practice, PracticeGame
  components/                ChessBoard, GameControls, MoveHistory, PracticeCard
  hooks/
    useChessGame.js          Game state, moves, undo, reset, engine replies
    useStockfish.js          Runs the engine for each position it must answer
  chess/
    StockfishEngine.js       Web Worker wrapper using UCI
    practicePositions.js     The six practice FEN positions and tips
    chessUtils.js            Game-status helper
scripts/
  copy-stockfish.mjs         Copies Stockfish files into public/stockfish
tests/
  chess.test.js              Automated tests
```

## Deployment

Endgame Studio is a static site. Your host must:

1. **Rewrite application routes to `index.html`**, so direct visits to `/play` or `/practice/...` work.
2. **Serve `.wasm` files as `application/wasm`.**

## Engine Distribution and License

Stockfish is **GPL-3.0** software. Its license is copied during the build and served at `/stockfish/COPYING.txt`.

- **Engine package:** `stockfish@19.0.1` (unmodified)
- **Source and build instructions:** https://github.com/nmrugg/stockfish.js/tree/v19.0.1

When redistributing the engine, preserve the license and comply with the GPL source distribution obligations.
