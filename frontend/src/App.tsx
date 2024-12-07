import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

    return (
        <>
            <p>yo bro</p>
            <h1>
                Hello world!
            </h1>
            <button className="button is-primary" onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </>
    )
}

export default App
