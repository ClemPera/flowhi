import { Elem } from "../../Store/elems";
import TrashIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useState } from "react";
import DeletePopup from "../../Popup/DeletePopup";

export default function Bin( {elem}: {elem: Elem} ) {
    let [popup, setPopup] = useState(false);

    let handleClick = (e: React.MouseEvent) => {
        setPopup(true);
        e.stopPropagation();
    }

    return (
        <>
            <button onClick={handleClick} className="btn"><TrashIcon fontSize="medium" sx={{ color: "#ff0000" }}/></button>
            {popup ? <DeletePopup disablePopup={() => setPopup(false)} id={elem.id} name={elem.name}/> : ""}
        </>
    )
}