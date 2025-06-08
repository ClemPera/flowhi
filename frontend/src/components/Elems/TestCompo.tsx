import { fieldsApi } from "../Api/fieldsApi";
import Goals from "./Sub/Goals";

export default function TestCompo( ) {
    function buttonClick(){
        fieldsApi.put(318, {name: "testTestTEst", goal_weekly: 3});
    }

    return (    
        <div className="bg-zinc-800 mx-1 md:mx-24 xl:mx-60 rounded-xl">  
            <Goals/>
            <div className="flex flex-col my-2 px-4 pb-10">
                <div className="relative grid grid-cols-12 pb-4">
                    <div className="col-span-11">
                        <h2 className="font-bold text-xl">TEST COMPO</h2>
                    </div>
                </div>
                <div className="place-content-center">
                    <div className="flex place-content-center place-items-center flex-wrap gap-3">

                        <button onClick={buttonClick} className="bg-black">JeSuisUnBouton</button>

                    </div>
                </div>
            </div>
        </div>
    )
}