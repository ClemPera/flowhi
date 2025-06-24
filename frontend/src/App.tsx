import './index.css';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';
import Date from './components/Date';
import TestCompo from './components/Elems/TestCompo';

function App() {
    return (
        <>
            <Date/>
            <SpawnCompo/>
            <TestCompo/>
            <Plus/>
        </>
    )
}

export default App
