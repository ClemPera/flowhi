import Scale from "./Scale";
import { Elem } from "./Store/elems";

export default function CompoHolder( {elem}: {elem: Elem} ) {
    switch (elem.kind) {
        case 'scale':
            return (
                <div className="flex bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-5 rounded-xl place-content-center">
                    <Scale key={elem.id} n={elem.size} elemId={elem.id}/>
                </div>
            )
    }
}