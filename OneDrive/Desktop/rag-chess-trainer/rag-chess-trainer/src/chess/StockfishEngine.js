export default class StockfishEngine {
  constructor() {
    this.worker = new Worker(`${import.meta.env.BASE_URL}stockfish/stockfish-19-lite-single.js`)
    this.ready = new Promise((resolve, reject) => {
      this.rejectReady = reject
      this.timer = setTimeout(() => reject(new Error('Engine loading timed out. Please retry.')), 20000)
      this.worker.onerror = () => { clearTimeout(this.timer); reject(new Error('Stockfish could not load. Please retry.')); this.pending?.reject(new Error('Engine stopped. Please retry.')) }
      this.worker.onmessage = ({ data }) => {
        const line = String(data)
        if (line === 'uciok') this.worker.postMessage('isready')
        if (line === 'readyok') { clearTimeout(this.timer); resolve() }
        if (line.startsWith('bestmove ') && this.pending) { this.pending.resolve(line.split(' ')[1]); this.pending = null }
      }
      this.worker.postMessage('uci')
    })
  }
  async bestMove(position, skill = 10) {
    await this.ready
    return new Promise((resolve, reject) => {
      this.pending = { resolve, reject }
      this.worker.postMessage(`setoption name Skill Level value ${skill}`)
      this.worker.postMessage(`position ${position}`)
      this.worker.postMessage('go movetime 700')
    })
  }
  destroy() { clearTimeout(this.timer); this.rejectReady(new Error('Cancelled')); this.pending?.reject(new Error('Cancelled')); this.worker.terminate() }
}
