import { useEffect, useState } from "react";
import Scale from "./Scale";

export default function SpawnCompo({ renderTriggerCount}: { renderTriggerCount: number}) {
    let [compo, setCompo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/fields", {"method":"GET"})
            .then(response => {
                if(!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.json();
            })
            .then(data => {
                setCompo(data);
            })
            .catch(error => console.error("Fetch error:", error)); // Handle errors

        console.log(compo);
    }, [renderTriggerCount])

    let listCompo:Array<JSX.Element> = []
    compo.forEach(comp => {
        switch(comp['kind']){
            case 'scale':
                listCompo = [...listCompo, <Scale n={comp['size']} key={comp['id']} />]
        }
    });

    return(
        <>
            {listCompo}
        </>
    )
}