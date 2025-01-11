import { useEffect, useRef} from "react";
import { useElems } from "./Store/elems";
import CompoHolder from "./CompoHolder";

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
                <CompoHolder elem={elem} key={elem.id}></CompoHolder>
            ))}
        </>
    )
}
