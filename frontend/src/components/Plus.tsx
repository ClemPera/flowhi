import { useState } from 'react';
import '../index.css';
import CreatePopup from './Popup/CreatePopup';

export default function Plus() {    
    let [popup, setPopup] = useState(false);

    let handleClick = (e: React.MouseEvent) => {
        setPopup(true);
        e.stopPropagation();
    }
    return (
        <>
            <div className="flex" id='button'>
                <button onClick={handleClick} className="grow bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 py-10 rounded-xl btn">
                    <a className="font-bold text-2xl">+ Create</a>
                </button>
            </div>
            {popup ? <CreatePopup disablePopup={() => setPopup(false)}/> : ""}
        </>
    )
}
