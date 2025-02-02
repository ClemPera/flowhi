import '../index.css';
import { useGeneral } from "./Store/general";

export default function Plus() {
    const { setCreatePopup: setPopup } = useGeneral();

    return (
        <>
            <div className="flex" id='button'>
                <button onClick={() => setPopup(true)} className="grow bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 py-10 rounded-xl btn">
                    <a className="font-bold text-2xl">+ Create</a>
                </button>
            </div>
        </>
    )
}
