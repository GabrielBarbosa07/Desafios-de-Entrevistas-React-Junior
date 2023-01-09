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
    console.log(list)
  }

  return (
    <div id="page" onClick={handleClick}>
      {list.map((item) => {
        return (
          <span key={item.clientX} className="dot" style={{ left: item.clientX, top: item.clientY }}>
          </span>
        )
      })}
    </div>
  )
}

export default App;
