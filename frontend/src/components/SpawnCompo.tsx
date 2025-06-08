import { useEffect, useRef} from "react";
import { Elem, useElems } from "./Store/elems";
import Scale from "./Elems/Scale";
import Time from "./Elems/Time";
import Goals from "./Elems/Sub/Goals";
import Bin from "./Elems/Sub/Bin";

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

function CompoHolder( {elem}: {elem: Elem} ) {
    let Component = () => {
        switch(elem.kind){
            case 'scale':
                return <Scale key={elem.id} n={elem.size} elemId={elem.id} />
            case 'time':
                return <Time key={elem.id} elemId={elem.id}/>
        }
    }

    return (    
        <div className="bg-zinc-800 mx-1 md:mx-24 xl:mx-60 rounded-xl">  
            <Goals/>
            <div className="flex flex-col my-2 px-4 pb-10">
                <div className="relative grid grid-cols-12 pb-4">
                    <div className="col-span-11">
                        <h2 className="font-bold text-xl">{elem.name}</h2>
                    </div>
                    <div className="col-span-1 flex-auto w-4 absolute top-0.5 right-3">
                        <Bin elem={elem}/>
                    </div>
                </div>
                <div className="place-content-center">
                    <div className="flex place-content-center place-items-center flex-wrap gap-3">
                        {Component()}
                    </div>
                </div>
            </div>
        </div>
    )
}