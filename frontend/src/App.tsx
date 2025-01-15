import './index.css'
import { useEffect, useState } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';
import Popup from './components/Popup';

function App() {
    const [popupEnabled, usePopupEnabled] = useState<boolean>(false);
    
    const handleWindowClick = (e: MouseEvent) => {
        if(!(e.target.closest('#button') || e.target.closest('#popup'))){
            console.log("disabled")
            usePopupEnabled(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleWindowClick);

        return () => {
            document.removeEventListener('click', handleWindowClick);
        }
    });

    return (
        <>
            <div>
                <div className={popupEnabled ? 'pointer-events-none blur' : ''} >
                    {/* if input outside, quit menu */}
                    <SpawnCompo/>
                    <Plus usePopupEnabled={usePopupEnabled}/>
                </div>
            </div>
            {popupEnabled && <Popup></Popup>}
        </>
    )
}

export default App
