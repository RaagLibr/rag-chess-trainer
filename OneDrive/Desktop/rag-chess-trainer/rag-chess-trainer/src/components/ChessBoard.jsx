import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
export default function ChessBoard({ game, move, flipped, disabled }) {
  const [selected, setSelected] = useState(null)
  const [promotion, setPromotion] = useState(null)
  const legal = selected ? game.moves({ square: selected, verbose: true }) : []
  const styles = {}
  const last = game.history({ verbose: true }).at(-1)
  if (last) for (const square of [last.from, last.to]) styles[square] = { backgroundColor: '#d6cb65aa' }
  if (selected) styles[selected] = { backgroundColor: '#b9cd64' }
  legal.forEach(m => { styles[m.to] = { backgroundImage: 'radial-gradient(circle, #15291f55 22%, transparent 25%)' } })
  function attempt(from, to) {
    if (disabled || !to) return false
    const choices = game.moves({ square: from, verbose: true }).filter(m => m.to === to)
    if (choices.some(m => m.promotion)) { setPromotion({ from, to }); setSelected(null); return false }
    const moved = move(from, to); setSelected(null); return moved
  }
  return <div className="board-wrap"><Chessboard options={{ position: game.fen(), boardOrientation: flipped ? 'black' : 'white', darkSquareStyle: { backgroundColor: '#638576' }, lightSquareStyle: { backgroundColor: '#e9eee4' }, squareStyles: styles, allowDragging: !disabled && !promotion, canDragPiece: ({ piece }) => piece.pieceType.startsWith('w'), onPieceDrop: ({ sourceSquare, targetSquare }) => attempt(sourceSquare, targetSquare), onSquareClick: ({ square }) => { if (disabled || promotion) return; if (selected && attempt(selected, square)) return; setSelected(game.get(square)?.color === 'w' ? square : null) } }} />{promotion && <div className="promotion" role="dialog" aria-label="Choose promotion piece"><h3>Promote your pawn</h3>{[['q','Queen'],['r','Rook'],['b','Bishop'],['n','Knight']].map(([piece,label]) => <button key={piece} onClick={() => { move(promotion.from, promotion.to, piece); setPromotion(null) }}>{label}</button>)}<button onClick={() => setPromotion(null)}>Cancel</button></div>}</div>
}
