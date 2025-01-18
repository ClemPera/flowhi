import './index.css'
import { useEffect, useState } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';
import Popup from './components/Popup';

function App() {
    const [popupEnabled, setPopupEnabled] = useState<boolean>(false);
    
    const handleWindowClick = (e: MouseEvent) => {
        if(!e.target.closest('#button') && !e.target.closest('#popup')){
            console.log("disabled")
            setPopupEnabled(false);
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
                    <Plus setPopupEnabled={setPopupEnabled}/>
                </div>
            </div>
            {popupEnabled && <Popup setPopupEnabled={setPopupEnabled}></Popup>}
        </>
    )
}

export default App
