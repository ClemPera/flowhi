import './index.css'
import { StrictMode, useState, useEffect } from 'react';
import Plus from './components/Plus'
import Scale from './components/Scale'

function App() {
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

    let tmp = []
    compo.forEach(comp => {
        tmp.push(comp['id']);
    });

    return (
        <>
            <StrictMode>
                <p>{JSON.stringify(compo)}</p>
                <p>{tmp}</p>
                <Scale n={8} />
                <Plus />
            </StrictMode>
        </>
    )
}

async function GetFields(){
    try{
        let response = await fetch("http://localhost:3000/fields", {"method":"GET"});
        let data = await response.json();
        return data;
    }
    catch(e){
        console.error("err:" + e);
    }
}

export default App
