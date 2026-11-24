import { useEffect, useState } from 'react'
import { Chess } from 'chess.js'
import { useStockfish } from './useStockfish'
export function useChessGame(initialFen, skill) {
  const [game, setGame] = useState(() => new Chess(initialFen))
  const [retry, setRetry] = useState(0)
  const history = game.history({ verbose: true })
  const position = `${initialFen ? `fen ${initialFen}` : 'startpos'} moves ${history.map(m => m.from + m.to + (m.promotion || '')).join(' ')}`
  const active = game.turn() === 'b' && !game.isGameOver()
  const { result, error } = useStockfish(position, active, skill, retry)
  function clone() { const next = new Chess(initialFen); game.history().forEach(move => next.move(move)); return next }
  useEffect(() => {
    if (!active || !result) return
    setGame(previous => {
      if (previous.turn() !== 'b') return previous
      const next = new Chess(initialFen)
      previous.history().forEach(move => next.move(move))
      try { next.move({ from: result.move.slice(0, 2), to: result.move.slice(2, 4), promotion: result.move[4] }); return next } catch { return previous }
    })
  }, [result, active, initialFen])
  function move(from, to, promotion = 'q') {
    if (active || game.isGameOver()) return false
    try { const next = clone(); next.move({ from, to, promotion }); setGame(next); return true } catch { return false }
  }
  function undo() { const next = clone(); next.undo(); if (next.turn() === 'b') next.undo(); setGame(next) }
  return { game, move, undo, reset: () => setGame(new Chess(initialFen)), active, error, retry: () => setRetry(n => n + 1) }
}
