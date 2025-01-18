import { useEffect, useRef, useState } from 'react';
import { useElems } from './Store/elems';
import ArrowUp from '@mui/icons-material/ExpandLess';
import ArrowBot from '@mui/icons-material/ExpandMore';
import { fieldsApi } from './fieldsApi';

export default function Popup({setPopupEnabled}: {setPopupEnabled: (v: boolean) => void} ) {
    const { addLast } = useElems()
    
    const nbrs = ['Two','Three', 'Four', 'Five', 'Six', 'Seven','Eight']
    const min = 2
    const max = nbrs.length;

    let inputRef = useRef<HTMLInputElement | null>(null);
    let [name, setName] = useState("");
    let [nbr, setNbr] = useState(min);
    let [first, setFirst] = useState(true);

    
    useEffect(() => {
        inputRef.current?.focus();
      }, [name]);
    
    let handleScaleClick = (e: React.MouseEvent) => {
        setFirst(false);
        e.stopPropagation();
    }
    
    let handleArrowUpClick = (e: React.MouseEvent) => {
        if(nbr <= max){
            setNbr(() => nbr++)
        }
        e.stopPropagation();
    }

    let handleArrowDownClick = (e: React.MouseEvent) => {
        if(nbr > min){
            setNbr(() => nbr--)
        }
        e.stopPropagation();
    }

    let handleValidClick = () => {
        fieldsApi.put(name, 'scale', nbr);
        addLast();
        setPopupEnabled(false);
    }

    function Scale(){
        return(
            <>
                <h3 className='text-xl text-center w-full'>Scale</h3>
                <div className='flex-grow bg-zinc-900 h-0.5 w-full my-2'></div>
                <div className="flex flex-col h-full w-full gap-1 overflow-y-auto">
                    <input ref={inputRef} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" className="bg-zinc-900 rounded-xl p-3 focus:outline-none h-full w-full" type="text"/>
                    <div className="h-full w-full flex flex-row">
                        <div className="flex flex-row bg-zinc-900 rounded-xl p-3 mr-2 h-full w-2/3">
                            <p className='text-slate-300 opacity-80 place-content-center'>One to&nbsp;</p>
                            <p className="place-content-center">{nbrs[nbr-min]}</p>
                        </div>
                        <div className='flex flex-col rounded-xl h-full w-1/3 bg-zinc-900 place-content-center py-1'>
                            <button onClick={handleArrowUpClick} className='h-full w-full'><ArrowUp fontSize='large' className='bg-zinc-900 place-self-center'/></button>
                            <div className='flex-grow bg-white h-0.5 w-full my-2'></div>
                            <button onClick={handleArrowDownClick} className='h-full w-full'><ArrowBot fontSize='large' className='bg-zinc-900 place-self-center'/></button>
                        </div>
                    </div>
                        <button onClick={() => handleValidClick()}  className="p-2 mt-2 h-full w-full font-bold bg-zinc-950 rounded-xl place-content-center">Valider</button>
                </div>
            </>
        )
    }

    function First(){
        return(
            <>
                <h3 className='text-xl text-center w-full'>Choose your module</h3>
                <div className='flex-grow bg-zinc-900 h-0.5 w-full my-2'></div>
                <div className="flex flex-col h-full w-full gap-1 overflow-y-auto">
                    <button onClick={handleScaleClick} className='flex-1 h-full w-full bg-zinc-900 rounded-xl place-content-center'>Scale</button>
                    <button className='flex-1 h-full w-full bg-zinc-900 rounded-xl place-content-center'>choice 2</button>
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