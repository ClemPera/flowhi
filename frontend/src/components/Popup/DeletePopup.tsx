import { useElems } from "../Store/elems";
import { fieldsApi } from '../Api/fieldsApi';

export default function DeletePopup({disablePopup, id, name}: {disablePopup: () => void, id: number, name: String}) {
    const { remove } = useElems();

    let handleClick = (e: React.MouseEvent) => {
        remove(id);
        fieldsApi.delete(id);

        disablePopup()
        e.stopPropagation();
    }


    const handleWindowClick = (e: React.MouseEvent) => {
        const popup = document.getElementById('popup');
        if (popup && !popup.contains(e.target as Node)) {
            disablePopup();
            e.stopPropagation();
        }
    };

    return (
        <>
            <div className='fixed inset-0 w-dvw h-dvh backdrop-blur-sm' onClick={(e) => handleWindowClick(e)}>
                <div id='popup' className='fixed place-content-center text-center px-8 pb-16 pt-4 rounded-xl border h-42 w-80 bg-zinc-800 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <h3 className='text-xl text-center w-full'>Delete?</h3>
                    <p>{name ? ' "' + name + '"' : '" "'}</p>
                    <div className='grow bg-zinc-900 h-0.5 w-full my-2 mb-3'></div>
                    <div className="flex flex-col h-12 w-full gap-1 overflow-y-auto">
                        <button onClick={handleClick} className='flex-1 h-full w-full bg-red-600 rounded-xl place-content-center btn'>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}
