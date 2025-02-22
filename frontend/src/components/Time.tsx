import { color, motion } from "motion/react";
import { useState } from "react";

export default function Time() {
    let [number, setNumber] = useState('');
    let [active, setActive] = useState(0);

    function modifNumber(inputText: string){
        let newInputText = inputText.replace(/[^0-9+-]+/g, '').replace(/([+-]){2,}/g, '$1')
        
        setNumber(newInputText);
    }

    function Input({id}: {id: number}){

        return(
            <motion.input
            initial={active==id && {color:"ff6900"} }
            animate={active==id && {color: ["#ff6900", "#ffffff"] }} 
            transition={{ delay:0.6, duration:0.2, repeatDelay:0.6, repeat: Infinity, repeatType: "reverse" }}

            value="0"
            onChange={(e) => modifNumber(e.target.value)} 
            className="text-center w-5 outline-none border-none focus:ring-0 focus:outline-none"
            />
        )
    }
    

    function submit(){ }

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
                    <form className="flex flex-row bg-black rounded-xl p-2" onSubmit={submit}>
                        {/* <input value={number} onChange={(e) => modifNumber(e.target.value)} className="bg-black w-10 rounded-xl"></input> */}

                        {/* Ajouter un + et un input à chaque fois que celui d'avant est écrit + faire pour que l'input s'adapte au texte*/}
                        
                        <Input id={3}/>
                        <Input id={2}/>
                        <p className="text-center w-5">h</p>
                        <Input id={1}/>
                        <Input id={0}/>
                        <p className="text-center w-5">m</p>

                    </form>
                        {/* <button onClick={() => setActive((a) => a + 1 )}>yo</button> */}
                </div>
            </div>
        </div>
    )
}

