import './index.css'
import { StrictMode, useState } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';

function App() {
    //When called trigger a render of all the components (scale...)
    let [renderTriggerCount, setRenderTriggerCount] = useState(0);
    let renderTrigger = () => setRenderTriggerCount(r => r+1);

    return (
        <>
            <StrictMode>
                <SpawnCompo renderTriggerCount={renderTriggerCount}/>
                <Plus renderTrigger={renderTrigger}/>
            </StrictMode>
        </>
    )
}

export default App
