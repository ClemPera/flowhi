import { Elem } from "../../Store/elems";
import TrashIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useGeneral } from "../../Store/general";

export default function Bin( {elem}: {elem: Elem} ) {
    let { setDeletePopup, setDeleteInfos } = useGeneral();

    let handleClick = (e: React.MouseEvent) => {
        setDeleteInfos(elem);
        setDeletePopup(true);
        e.stopPropagation();
    }

    return (
        <button onClick={handleClick} className="btn"><TrashIcon fontSize="medium" sx={{ color: "#ff0000" }}/></button>
    )
}