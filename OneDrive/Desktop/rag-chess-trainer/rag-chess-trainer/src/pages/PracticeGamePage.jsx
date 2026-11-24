import { useParams, Link } from 'react-router-dom'
import { practicePositions } from '../chess/practicePositions'
import PlayPage from './PlayPage'
export default function PracticeGamePage() { const { id } = useParams(); const practice = practicePositions.find(p => p.id === id); return practice ? <PlayPage key={id} practice={practice} /> : <main><h1>Practice not found</h1><Link to="/practice">Browse all practices</Link></main> }
