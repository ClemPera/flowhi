import './index.css';
import { useEffect } from 'react';
import Plus from './components/Plus'
import SpawnCompo from './components/SpawnCompo';
import CreatePopup from './components/CreatePopup';
import { useGeneral } from "./components/Store/general";
import DeletePopup from './components/DeletePopup';
import Date from './components/Date';
import Time from './components/Time';

function App() {
    const { createPopUp: popUp, setCreatePopup, createPopUp, setDeletePopup, deletePopUp } = useGeneral();
    
    const handleWindowClick = (e: MouseEvent) => {
        if(!e.target.closest('#button') && !e.target.closest('#popup')){
            if(createPopUp || deletePopUp){
                setDeletePopup(false);
                setCreatePopup(false);
            }
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
            <div className="">
                <div className={popUp||deletePopUp ? 'pointer-events-none blur-sm' : ''} >
                    <Date/>
                    <Time/>
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
