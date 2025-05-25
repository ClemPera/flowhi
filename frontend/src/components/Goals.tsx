export default function Goals(id){

    //TODO:Fetch goal from id and set goals to true or false
    let goals = true;
    
    let color = "bg-lime-600"

    return (
        <>
            {goals? 
                <div className={"min-w-max min-h-2 rounded-tl-xl rounded-tr-xl " + color}/>
            : null }
        </>
    )
}