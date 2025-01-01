import './index.css'
import { StrictMode } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';

function App() {
    return (
        <>
            <StrictMode>
                <SpawnCompo/>
                <Plus/>
            </StrictMode>
        </>
    )
}

export default App
