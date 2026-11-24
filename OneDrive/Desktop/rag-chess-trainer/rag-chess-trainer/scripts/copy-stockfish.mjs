import { copyFileSync, mkdirSync } from 'node:fs'
mkdirSync('public/stockfish', { recursive: true })
for (const name of ['stockfish-19-lite-single.js', 'stockfish-19-lite-single.wasm']) copyFileSync(`node_modules/stockfish/bin/${name}`, `public/stockfish/${name}`)
copyFileSync('node_modules/stockfish/Copying.txt', 'public/stockfish/COPYING.txt')
