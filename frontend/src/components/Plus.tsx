import '../index.css'
import { useElems } from './Store/elems';
import { fieldsApi } from "./fieldsApi";

export default function Plus() {
    const { addLast } = useElems()

    function handleButtonClick(){
        fieldsApi.put("toto", "scale", Math.random()*6+1)
        addLast();
    }

    return (
        <>
            <div className="flex">
                <button onClick={handleButtonClick} className="grow bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 py-10 rounded-xl hover:bg-opacity-80">
                    <a className="font-bold text-2xl">+ Create</a>
                </button>
            </div>
        </>
    )
}
