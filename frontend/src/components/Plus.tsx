import { useEffect, useState } from 'react';
import '../index.css'
import Scale from './Scale';
import { useStore } from './Store/elems';

export default function Plus() {
    const { add } = useStore()
    
    function newComponent(name: string, kind: string, size: number){
        //Api call to add a new component (fields)
        fetch("http://localhost:3000/fields?name=" + name + "&kind=" + kind + "&size=" + size, 
            {"method":"POST"}
        )
    }

    function fetchComponent(){
        //Fetch the last created component
        let listCompo:JSX.Element = <></>;
    
        fetch("http://localhost:3000/fields?lastOne=1", {"method":"GET"}) //Just get the last one created
            .then(response => {
                if(!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.json();
            })
            .then(data => {
                data.forEach((comp: any)=> {
                    switch(comp['kind']){
                        case 'scale':
                            add(<Scale n={comp['size']} key={comp['id']} />)
                    }
                });
            })
            .catch(error => console.error("Fetch error:", error)); // Handle errors
        
        return(listCompo)
    }

    function handleButtonClick(){
        newComponent("toto", "scale", Math.random()*8+1); 
        fetchComponent();
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
