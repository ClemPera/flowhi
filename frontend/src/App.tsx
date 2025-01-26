import './index.css';
import { useEffect } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';
import CreatePopup from './components/CreatePopup';
import { useGeneral } from "./components/Store/general";
import DeletePopup from './components/DeletePopup';

function App() {
    const { createPopUp: popUp, setCreatePopup, setDeletePopup, deletePopUp } = useGeneral();
    
    const handleWindowClick = (e: MouseEvent) => {
        if(!e.target.closest('#button') && !e.target.closest('#popup')){
            setDeletePopup(false);
            setCreatePopup(false);
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
                <div className={popUp||deletePopUp ? 'pointer-events-none blur' : ''} >
                    <SpawnCompo/>
                    <Plus/>
                </div>
            </div>
            {popUp && <CreatePopup></CreatePopup>}
            {deletePopUp && <DeletePopup></DeletePopup>}
        </>
    )
}

export default App
