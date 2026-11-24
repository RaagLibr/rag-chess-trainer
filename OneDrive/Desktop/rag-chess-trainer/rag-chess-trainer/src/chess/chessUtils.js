export function gameStatus(game) {
  if (game.isCheckmate()) return game.turn() === 'b' ? 'Checkmate. You won!' : 'Checkmate. Stockfish won.'
  if (game.isStalemate()) return 'Draw by stalemate. Try leaving an escape square.'
  if (game.isThreefoldRepetition()) return 'Draw by threefold repetition.'
  if (game.isInsufficientMaterial()) return 'Draw by insufficient material.'
  if (game.isDraw()) return 'Draw by the fifty-move rule.'
  return `${game.turn() === 'w' ? 'Your turn' : 'Stockfish is thinking…'}${game.isCheck() ? ' · Check' : ''}`
}
