import '../index.css'
import { dataApi } from './dataApi';

export default function Scale( {n, elemId}: {n: number, elemId: number} ) {
    let items: any = [];
    let id = 0;

    //List points
    for(let i: number = 0; i < n; i++){
        if(i != 0) {
            items.push(<Line key={items.length}/>)
        }
        
        items.push(<Point id={id++} key={items.length}/>)
    }
    //TODO: If >8 (or smth idk), change for something else or smth
    
    function Point({id}: {id: number}) {
        //Half point
        return (
            <>
                <button onClick={() => updateStatus(id)} className="relative w-5 h-5 bg-transparent rounded-full border-4 border-white hover:bg-white focus:bg-white"></button>
            </>
        )
    }
    
    function Line() {
        //Line - place-self-center
        return (
            <div className="place-self-center w-5 transform -translate-y-1">
                <div className="absolute w-6 h-2 bg-white -translate-x-0.5"></div>
            </div>
        )
    }
    
    function updateStatus(PointId: number){
        dataApi.post(elemId, PointId);
    }

    return (
        <div className="flex bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 pb-5 rounded-xl place-content-center">
            {items}
        </div>
    )
}

