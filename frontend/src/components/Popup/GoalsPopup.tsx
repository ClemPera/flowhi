import { useState } from "react";

export default function GoalsPopup({disablePopup, fieldId}: {disablePopup: () => void, fieldId : number}) {
    let [radioSelected, setRadioSelected] = useState('daily');

    let handleClick = (e: React.MouseEvent) => {
        // remove(deleteInfos.id);
        // fieldsApi.delete(deleteInfos.id);

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
                <div id='popup' className='fixed place-content-center text-center px-8 pb-4 pt-4 rounded-xl border w-80 bg-zinc-800 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <h3 className='text-xl text-center w-full'>Set goal</h3>
                    {/* <p>{deleteInfos.name ? ' "' + deleteInfos.name + '"' : '" "'}</p> */}
                    <div className='grow bg-zinc-900 h-0.5 w-full my-2 mb-3'></div>
                    <div className="flex flex-col w-full gap-1 overflow-y-auto">
                        <div className="flex flex-row gap-2 place-content-center">
                            <label className="cursor-pointer">
                                <input type="radio" name="type" value="daily" className="hidden peer" checked={radioSelected === 'daily'} onChange={() => setRadioSelected("daily")} />
                                <div className="p-1 px-3 rounded-xl bg-zinc-900 peer-checked:bg-zinc-950">
                                    Daily
                                </div>
                            </label>
                            
                            <label className="cursor-pointer">
                                <input type="radio" name="type" value="weekly" className="hidden peer" checked={radioSelected === 'weekly'} onChange={() => setRadioSelected('weekly')} />
                                <div className="p-1 px-3 rounded-xl bg-zinc-900 peer-checked:bg-zinc-950">
                                    Weekly
                                </div>
                            </label>
                            
                            <label className="cursor-pointer">
                                <input type="radio" name="type" value="monthly" className="hidden peer" checked={radioSelected === 'monthly'} onChange={() => setRadioSelected('monthly')} />
                                <div className="p-1 px-3 rounded-xl bg-zinc-900 peer-checked:bg-zinc-950">
                                    Monthly
                                </div>
                            </label>
                        </div>
                        <input name="value" placeholder="12" className="bg-zinc-900 rounded-xl p-3 focus:outline-hidden h-full w-full mt-1" type="number" />
                        <button onClick={handleClick} className='flex-1 h-full w-full bg-zinc-950 rounded-xl place-content-center btn p-2 mt-2'>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}
