import React, { useRef, useState } from 'react';
import { useElems } from './Store/elems';
import ArrowUp from '@mui/icons-material/ExpandLess';
import ArrowBot from '@mui/icons-material/ExpandMore';
import { fieldsApi } from './Api/fieldsApi';
import { useGeneral } from './Store/general';

export default function CreatePopup() {
    const { setCreatePopup: setPopup } = useGeneral();
    const { addLast } = useElems();
    
    let size = useRef(0);
    let [first, setFirst] = useState(true);
    let [err, setErr] = useState(false);
    
    let handleScaleClick = (e: React.MouseEvent) => {
        setFirst(false);
        e.stopPropagation();
    }
    
    let validClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget as HTMLFormElement);
        let name = formData.get("name")?.toString();

        if(!name)
            name = '';

        if(await fieldsApi.post(name, 'scale', size.current) == 0){
            addLast();
            setPopup(false);
        }
        else{
            setErr(true);
            e.stopPropagation();
        }
    }

    function Scale(){
        return(
            <>
                <form onSubmit={validClick}>
                    <h3 className='text-xl text-center w-full'>Scale</h3>
                    <div className='grow bg-zinc-900 h-0.5 w-full my-2 mb-3'></div>
                    <div className="flex flex-col h-full w-full gap-2 pb-1 overflow-y-auto">
                            <input name="name" placeholder="Name" className={(err ? "bg-red-800" : "bg-zinc-900") + " rounded-xl p-3 focus:outline-hidden h-full w-full "} type="text"/>
                            <Size/>
                            <button type="submit" className="p-2 mt-1 h-full w-full font-bold bg-zinc-950 rounded-xl place-content-center btn">Valider</button>
                    </div>
                </form>
            </>
        )
    }
    
    function Size(){
        const nbrsText = ['Two','Three', 'Four', 'Five', 'Six', 'Seven','Eight'];
        const min = 2;
        const max = nbrsText.length;

        let [nbr, setNbr] = useState(min);
        
        let handleArrowUpClick = (e: React.MouseEvent) => {
            if(nbr <= max)
                setNbr(() => nbr++)

            size.current = nbr
            e.stopPropagation();
        }
    
        let handleArrowDownClick = (e: React.MouseEvent) => {
            if(nbr > min)
                setNbr(() => nbr--)

            size.current = nbr
            e.stopPropagation();
        }

        return(
            <div className="h-full w-full flex flex-row ">
                <div className="flex flex-row rounded-xl h-24 w-2/3 bg-zinc-900 p-3 mr-2">
                    <p className='text-slate-300 opacity-80 place-content-center'>One to&nbsp;</p>
                    <p className="place-content-center">{nbrsText[nbr-min]}</p>
                </div>
                <div className='flex flex-col rounded-xl h-24 w-1/3 bg-zinc-900 place-content-center py-1'>
                    <button type="button" onClick={handleArrowUpClick} className='h-full w-full btn'><ArrowUp fontSize='large' className='bg-zinc-900 place-self-center'/></button>
                    <div className='grow bg-white h-0.5 w-full my-2'></div>
                    <button type="button" onClick={handleArrowDownClick} className='h-full w-full btn'><ArrowBot fontSize='large' className='bg-zinc-900 place-self-center'/></button>
                </div>
            </div>
        )
    }

    function First(){
        return (
            <>
                <h3 className='text-xl text-center w-full'>Choose your element</h3>
                <div className='grow bg-zinc-900 h-0.5 w-full my-2 mb-3'></div>
                <div className="flex flex-col h-full w-full gap-2 pb-1 overflow-y-auto">
                    <button onClick={handleScaleClick} className='flex-1 h-full w-full bg-zinc-900 rounded-xl place-content-center btn'>Scale</button>
                    <button className='flex-1 h-full w-full bg-zinc-900 rounded-xl place-content-center btn'>choice 2</button>
                </div>
            </>
        )
    }

    return (
        <div id='popup' className='fixed place-content-center text-center px-8 pb-16 pt-4 rounded-xl border h-72 w-80 bg-zinc-800 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            {first ? <First/> : <Scale/>}
        </div>
    )
}