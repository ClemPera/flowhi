import { useGeneral } from '../../Store/general';
export default function Goals(id: number){
    //TODO:Fetch goal from id and set goals to true or false + get necessary stuff
    //TODO:Handle click to modify goals (+pointer effect) + popup
    let color = "bg-zinc-900";
    const { setGoalsPopup }: {setGoalsPopup: any} = useGeneral();

    let handleClick = (e: React.MouseEvent) => {
        setGoalsPopup(true);
        e.stopPropagation();
    }

    return (
        <div onClick={handleClick}>
            <div className={"min-w-max min-h-2 rounded-tl-xl rounded-tr-xl " + color}/>
        </div>
    )
}