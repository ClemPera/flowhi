import '../index.css'
import { useElems } from './Store/elems';

export default function Plus({setPopupEnabled}: {setPopupEnabled: (v: boolean) => void} ) {
    return (
        <>
            <div className="flex" id='button'>
                <button onClick={() => setPopupEnabled(true)} className="grow bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 py-10 rounded-xl hover:bg-opacity-80">
                    <a className="font-bold text-2xl">+ Create</a>
                </button>
            </div>
        </>
    )
}
