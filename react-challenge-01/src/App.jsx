import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([])

  const handleClick = (e) => {
    const newDot = {
      clientX: e.clientX,
      clientY: e.clientY
    }

    setList((prev) => [...prev, newDot])

  }

  const RemoveLastDot = (e) => {
    e.stopPropagation()

    setList((prev) => [...prev].slice(0, -1))
  }


  return (
    <div id="page" onClick={handleClick}>
      <button onClick={RemoveLastDot}>Remover</button>
      {list.map((item) => {
        return (
          <span key="" className="dot" style={{ left: item.clientX, top: item.clientY }}>
          </span>
        )
      })}
    </div>
  )
}

export default App;
