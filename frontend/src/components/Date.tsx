import { useEffect, useState } from "react"

export default function Calendar(){
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        setDate(new Date());
    }, [])

    function Before(){
        setDate((oldDate) => {
            const newDate = new Date(oldDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate; 
          });
    }

    function After(){
        if(date.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
            setDate((oldDate) => {
                const newDate = new Date(oldDate);
                newDate.setDate(newDate.getDate() + 1);
                return newDate; 
            });
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