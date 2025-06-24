import { useState } from 'react';
import GoalsPopup from '../../Popup/GoalsPopup';
export default function Goals({id}: {id: number}){
    //TODO:Fetch goal from id and set goals to true or false + get necessary stuff
    //TODO:Handle click to modify goals (+pointer effect) + popup
    let color = "bg-zinc-900";
    
    let [popup, setPopup] = useState(false);

    let handleClick = (e: React.MouseEvent) => {
        setPopup(true);
        e.stopPropagation();
    }

    return (
        <div onClick={handleClick}>
            <div className={"min-w-max min-h-2 rounded-tl-xl rounded-tr-xl " + color}/>
            {popup ? <GoalsPopup disablePopup={() => setPopup(false)}/> : ""}
        </div>
    )
}