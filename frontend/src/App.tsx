import './index.css'
import { StrictMode, useState, useEffect } from 'react';
import Plus from './components/Plus'
import Scale from './components/Scale';

function App() {
    let listCompo = ListCompos();
    
    return (
        <>
            <StrictMode>
                {listCompo}
                <Plus />
            </StrictMode>
        </>
    )
}

export default App

function ListCompos(){
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
    }, [])

    let listCompo:Array<JSX.Element> = []
    compo.forEach(comp => {
        if(comp['kind'] == 'scale'){
            listCompo = [...listCompo, <Scale n={comp['size']} key={comp['id']} />]
        }
    });

    return listCompo;
}