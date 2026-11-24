import { BrowserRouter, NavLink, Link, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlayPage from './pages/PlayPage'
import PracticePage from './pages/PracticePage'
import PracticeGamePage from './pages/PracticeGamePage'
import './App.css'
export default function App() { return <BrowserRouter><header><Link to="/" className="brand"><span>♞</span> Endgame<span className="brand-light">studio</span></Link><nav><NavLink to="/" end>Home</NavLink><NavLink to="/play">Play</NavLink><NavLink to="/practice">Practice</NavLink></nav><span className="header-note">One move better.</span></header><Routes><Route path="/" element={<HomePage />} /><Route path="/play" element={<PlayPage key="full-game" />} /><Route path="/practice" element={<PracticePage />} /><Route path="/practice/:id" element={<PracticeGamePage />} /><Route path="*" element={<main><h1>Page not found</h1><Link to="/">Go home</Link></main>} /></Routes><footer><span>ENDGAME STUDIO</span><span>Think clearly. Finish confidently.</span><a href="https://github.com/nmrugg/stockfish.js">Stockfish source & GPL-3.0</a></footer></BrowserRouter> }
