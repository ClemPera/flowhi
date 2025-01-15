import { useElems } from './Store/elems';

export default function Popup() {
    
    // const { addLast } = useElems()
    // fieldsApi.put("toto", "scale", Math.random()*6+1)
    // addLast();
    
    return(
        <div id='popup' className='fixed flex place-content-center text-center p-8 rounded-xl border h-72 w-80 bg-zinc-800 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            <div>
                <button className='rounded-xl bg-zinc-900 w-56 h-12'>Dropdown</button>
            </div>
        </div>
    )
}