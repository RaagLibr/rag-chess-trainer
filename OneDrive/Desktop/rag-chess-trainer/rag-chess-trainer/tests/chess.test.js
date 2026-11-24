import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { Chess } from 'chess.js'
import { practicePositions } from '../src/chess/practicePositions.js'
import { gameStatus } from '../src/chess/chessUtils.js'
test('practice positions are playable and the inactive king is not in check', () => {
  for (const p of practicePositions) { const game = new Chess(p.fen); assert(!game.isGameOver()); assert.equal(game.turn(), 'w'); assert(!new Chess(p.fen.replace(' w ', ' b ')).isCheck(), p.id) }
})
test('checkmate and stalemate are distinguished', () => {
  assert.match(gameStatus(new Chess('7k/6Q1/5K2/8/8/8/8/8 b - - 0 1')), /You won/)
  assert.match(gameStatus(new Chess('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1')), /stalemate/)
})
test('Stockfish returns legal defensive moves for all six endgames', { timeout: 20000 }, async () => {
  const engine = spawn(process.execPath, ['node_modules/stockfish/bin/stockfish-19-lite-single.js'])
  let buffer = '', waiting
  engine.stdout.on('data', data => { buffer += data; const lines = buffer.split('\n'); buffer = lines.pop(); for (const line of lines) if (waiting && line.startsWith(waiting.prefix)) { const w = waiting; waiting = null; w.resolve(line) } })
  const wait = prefix => new Promise(resolve => { waiting = { prefix, resolve } })
  const send = command => engine.stdin.write(command + '\n')
  try {
    let response = wait('uciok'); send('uci'); await response
    response = wait('readyok'); send('isready'); await response
    for (const p of practicePositions) {
      const game = new Chess(p.fen); game.move(game.moves()[0]);
      response = wait('bestmove '); send('position fen ' + game.fen()); send('go movetime 100');
      const move = (await response).split(' ')[1]
      assert(game.move({ from: move.slice(0, 2), to: move.slice(2, 4), promotion: move[4] }), p.id)
    }
  } finally { engine.kill() }
})
