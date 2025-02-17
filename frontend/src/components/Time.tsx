import { useState } from "react";

export default function Time() {
    let [number, setNumber] = useState('');

    function modifNumber(inputText: string){
        let newInputText = inputText.replace(/[^0-9+-]+/g, '').replace(/([+-]){2,}/g, '$1')
        
        setNumber(newInputText);
    }

    function submit(){

    }

    return (
        <div className="grid grid-rows-3 bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-4 rounded-xl">
            <div className="relative grid grid-cols-12">
                <div className="col-span-11">
                    <h2 className="font-bold text-xl">name</h2>
                </div>
                <div className="col-span-1 flex-auto w-4 absolute top-0.5 right-3">
                </div>
            </div>
            <div className="place-content-center">
                <div className='flex place-content-center '>
                    <form className="flex flex-row" onSubmit={submit}>
                        <input value={number} onChange={(e) => modifNumber(e.target.value)} className="bg-black"></input>
                        {/* Ajouter un + et un input à chaque fois que celui d'avant est écrit + faire pour que l'input s'adapte au texte*/}
                    </form>
                </div>
            </div>
        </div>
    )
}

