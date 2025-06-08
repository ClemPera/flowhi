export default function Goals(id){
    //TODO:Fetch goal from id and set goals to true or false + get necessary stuff
    //TODO:Handle click to modify goals (+pointer effect) + popup
    let goals = true;
    
    let color = "bg-zinc-900"

    return (
        <>
            {goals? 
                <div className={"min-w-max min-h-2 rounded-tl-xl rounded-tr-xl " + color}/>
            : null }
        </>
    )
}