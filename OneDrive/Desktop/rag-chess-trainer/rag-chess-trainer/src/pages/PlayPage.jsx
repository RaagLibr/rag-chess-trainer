import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChessGame } from '../hooks/useChessGame'
import { gameStatus } from '../chess/chessUtils'
import ChessBoard from '../components/ChessBoard'
import GameControls from '../components/GameControls'
import MoveHistory from '../components/MoveHistory'
export default function PlayPage({ practice }) {
  const [skill, setSkill] = useState(practice ? 20 : 5)
  const [flipped, setFlipped] = useState(false)
  const [revision, setRevision] = useState(0)
  const state = useChessGame(practice?.fen, skill)
  const { game } = state
  return <main className="game-page"><Link className="back" to="/practice">All practice mates</Link><div className="game-heading"><div><div className="eyebrow">{practice ? 'ENDGAME PRACTICE' : 'THE FULL GAME'}</div><h1>{practice ? `${practice.title} mate` : 'You vs. Stockfish'}</h1></div><span className="tag">{practice ? practice.pieces : '♔ ♚'}</span></div><div className="game-layout"><div><div className="player"><span className="avatar">♚</span><div><strong>Stockfish</strong><small>{practice ? 'Best defense · Skill 20' : `Skill level ${skill}`} · Black</small></div></div><ChessBoard key={revision} game={game} move={state.move} flipped={flipped} disabled={state.active || game.isGameOver()} /><div className="player"><span className="avatar white">♔</span><div><strong>You</strong><small>White · {game.history({ verbose: true }).filter(m => m.color === 'w').length} moves played</small></div></div><GameControls undo={() => { state.undo(); setRevision(n => n + 1) }} reset={() => { state.reset(); setRevision(n => n + 1) }} flip={() => setFlipped(v => !v)} canUndo={game.history().length > 0} /></div><aside><section className={`panel status ${game.isCheckmate() ? 'won' : ''}`} aria-live="polite"><div className="eyebrow">{game.isGameOver() ? 'RESULT' : 'ON THE BOARD'}</div><h2>{state.error ? 'Engine unavailable' : gameStatus(game)}</h2><p>{state.error || (game.isGameOver() ? 'Restart the position to practice again.' : 'Drag a piece, or click a piece and its destination.')}</p>{state.error && <button onClick={state.retry}>Retry engine</button>}</section><section className="panel"><h3>{practice ? 'Your game plan' : 'Choose your challenge'}</h3>{practice ? <p>{practice.tip}</p> : <label>Engine strength<select value={skill} onChange={e => setSkill(Number(e.target.value))}><option value="0">Casual · Level 0</option><option value="5">Club · Level 5</option><option value="10">Advanced · Level 10</option><option value="20">Maximum · Level 20</option></select></label>}</section><MoveHistory history={game.history()} /><p className="engine-note">Powered by Stockfish 19 Lite.<br />Engine runs locally in your browser.</p></aside></div></main>
}
