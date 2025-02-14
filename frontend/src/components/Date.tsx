import { useEffect } from "react"
import { useGeneral } from "./Store/general";
import ArrowLeft from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowRight from '@mui/icons-material/ArrowForwardIosRounded';

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
            <div className="flex flex-row place-content-center mb-4 -mt-5">
                <button className="btn mx-2" onClick={Before}><ArrowLeft/></button>
                <div className="text-center ">
                    <p> {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", })} </p>
                    {}
                </div>
                {new Date().setHours(0,0,0,0) == date.setHours(0,0,0,0) ? <div className="mx-5"></div> : <button className="btn mx-2" onClick={After}><ArrowRight/></button> } 
            </div>
        </>
    )
}