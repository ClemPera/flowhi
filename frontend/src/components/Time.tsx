import React, { useState } from "react";

export default function Time(  ) {
    let [val, setVal] = useState("");

    let handleKeyPress = () => {

    };

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
                    {/* <input type="number" pattern="[0-9+-]+/g" onKeyDown={handleKeyPress} value={(e) => setVal(e.target.value)} className="bg-black"></input> */}
                </div>
            </div>
        </div>
    )
}

