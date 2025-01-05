import { useEffect, useRef} from "react";
import { useElems } from "./Store/elems";
import Scale from "./Scale";

export default function SpawnCompo() {
    const { elems, addAll } = useElems()
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            addAll();
            hasRun.current = true;
        }
        
    }, [])


    return(
        <>
            {elems.map((elem) => (
                <Scale key={elem.id} n={elem.size} />
            ))}
        </>
    )
}