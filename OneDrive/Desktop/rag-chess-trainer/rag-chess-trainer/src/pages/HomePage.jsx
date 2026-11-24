import { Link } from 'react-router-dom'
import PracticePage from './PracticePage'
export default function HomePage() { return <><PracticePage /><div className="home-cta"><div><h2>Ready for the whole board?</h2><p>Put your skills to work in a full game against Stockfish.</p></div><Link className="primary" to="/play">Play a game</Link></div></> }
