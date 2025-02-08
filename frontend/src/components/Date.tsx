import { useEffect } from "react"
import { useGeneral } from "./Store/general";

export default function Calendar(){
    const {date, setDate} = useGeneral()

    useEffect(() => {
        setDate(new Date());
    }, [])

    function Before(){
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        setDate(newDate); 
    }

    function After(){
        if(date.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setDate(newDate); 
        }
    }

    return(
        <>
            <div className="text-center mb-4 -mt-5">
                <p> {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })} </p>
                {}
                <button onClick={Before}>precede-</button>
                <button onClick={After}>Next-</button>
            </div>
        </>
    )
}