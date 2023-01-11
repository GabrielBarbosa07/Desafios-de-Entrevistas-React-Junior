import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (e) => {
    const newDot = {
      clientX: e.clientX,
      clientY: e.clientY
    }

    setList((prev) => [...prev, newDot])
  }

  const handleUndo = (e) => {
    e.stopPropagation()

    if (list.length === 0) {
      return
    }

    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])
    setList((prev) => [...prev].slice(0, -1))
  }

  const handleRedo = (e) => {
    e.stopPropagation()

    if (undid.length === 0) {
      return
    }
    const lastItem = undid[undid.length - 1]
    setList((prev) => [...prev, lastItem])
    setUndid((prev) => [...prev].slice(0, -1))

  }

  return (
    <div id="page" onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item) => {
        return (
          <span className="dot" style={{ left: item.clientX, top: item.clientY }}>
          </span>
        )
      })}
    </div>
  )
}

export default App;
