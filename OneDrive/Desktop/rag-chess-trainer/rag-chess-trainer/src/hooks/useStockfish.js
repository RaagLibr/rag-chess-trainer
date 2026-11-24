import { useEffect, useState } from 'react'
import StockfishEngine from '../chess/StockfishEngine'
export function useStockfish(position, active, skill, retry) {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!active) return
    let current = true
    const engine = new StockfishEngine()
    engine.bestMove(position, skill).then(move => { if (current) { setError(null); setResult({ position, move }) } }).catch(err => { if (current) setError({ position, message: err.message }) })
    return () => { current = false; engine.destroy() }
  }, [position, active, skill, retry])
  return { result: result?.position === position ? result : null, error: error?.position === position ? error.message : null }
}
