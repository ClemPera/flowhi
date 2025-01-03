import { useEffect, useState } from "react";
import Scale from "./Scale";
import { useStore } from "./Store/elems";

export default function SpawnCompo() {
    let [compo, setCompo] = useState([]);

    const { elems, clear, add } = useStore()

    useEffect(() => {
        let ignore = false;

        fetch("http://localhost:3000/fields", { "method": "GET" })
            .then(response => {
                if (!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.json();
            })
            .then(data => {
                if (!ignore) {
                    setCompo(data);
                }
            })
            .catch(error => console.error("Fetch error:", error)); // Handle errors

        console.log(compo);
        return () => {
            ignore = true;
        };
    }, [])

    useEffect(() => {
        let ignore = false;
        compo.forEach(comp => {
            switch (comp['kind']) {
                case 'scale':
                    if (!ignore) {
                        add(<Scale n={comp['size']} key={comp['id']} />)
                    }
            }
        });

        return () => {
            ignore = true;
            clear();
        };
        //TODO Gérer quand il a déjà été pull une fois (dev mode)
    }, [compo])
    // let listCompo:Array<JSX.Element> = []

    return(
        <>
            {elems}
        </>
    )
}