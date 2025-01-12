import { fieldsApi } from "./fieldsApi"
import { useElems } from "./Store/elems";
import TrashIcon from '@mui/icons-material/DeleteOutlineRounded';

export default function Bin( {id}: {id: number} ) {
    const { remove } = useElems();

    function handleClick(){
        remove(id);
        fieldsApi.delete(id);
    }

    return (
        <button onClick={handleClick}><TrashIcon fontSize="medium" sx={{ color: "#ff0000" }}/></button>
    )
}