import { useEffect, useState } from 'react';
import '../index.css'
import { dataApi } from './Api/dataApi';
import { useGeneral } from './Store/general';

export default function Scale( {n, elemId}: {n: number, elemId: number} ) {
    const {date} = useGeneral()
    let [selected, setSelected] = useState(-1);

    let items: any = [];
    let id = 0;

    //**If this is causing too much charge on the server side**
    //You should remove everything and add everything back following the date
    //You also should get all the data at the same time as the fields 
    //  and bind it to the elem
    useEffect(() => {
        dataApi.get(elemId, date).then((d: any) => {
            if(d[0] !== -1)
                setSelected(d['data']);
            else
                setSelected(-1);
        })
    }, [date])


    for(let i: number = 0; i < n; i++){
        if(i != 0) {
            items.push(<Line key={items.length}/>)
        }
        items.push(<Point id={id++} key={items.length}/>)
    }
    //TODO: If >6 (or smth idk), change for something else or smth
    
    function Point({id}: {id: number}) {
        if(id==selected)
            return <button onClick={() => updateStatus(id)} className="relative w-5 h-5 rounded-full border-4 border-white bg-white"></button>
        else
            return <button onClick={() => updateStatus(id)} className="relative w-5 h-5 rounded-full border-4 border-white bg-transparent hover:bg-white btn"></button>
    }
    
    function Line() {
        return (
            <div className="place-self-center w-5 transform -translate-y-1">
                <div className="absolute w-6 h-2 bg-white -translate-x-0.5"></div>
            </div>
        )
    }
    
    function updateStatus(PointId: number){
        dataApi.post(elemId, PointId, date);

        setSelected(PointId);
    }

    return (
        //TODO: Replace that with a grid?
        <div className='flex place-content-center '>
            {items}
        </div>
    )
}

