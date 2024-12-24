import './index.css'
import Plus from './components/Plus'
import Scale from './components/Scale'

function App() {
    return (
        <>
            <Scale n={8} />
            <Plus />
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
