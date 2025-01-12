import Bin from "./Bin";
import Scale from "./Scale";
import { Elem } from "./Store/elems";

export default function CompoHolder( {elem}: {elem: Elem} ) {
    switch (elem.kind) {
        case 'scale':
            return (
                <div className="relative grid grid-cols-12 bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-4 rounded-xl ">
                    <div className="col-span-11 place-content-center">
                        <Scale key={elem.id} n={elem.size} elemId={elem.id} />
                    </div>
                    <div className="col-span-1 flex-auto w-4 absolute top-0.5 right-3">
                        <Bin id={elem.id}/>
                    </div>
                </div>
            )
    }
}