import '../index.css'

export default function Plus() {
    return (
        <div className="flex">
            <button onClick={() => NewComponent("toto", "scale", Math.random()*8+1)}  className="grow bg-zinc-800 mx-1 md:mx-24 xl:mx-60 my-2 p-4 py-10 rounded-xl hover:bg-opacity-80">
                <a className="font-bold text-2xl">+ Create</a>
            </button>
        </div>
    )
}

function NewComponent(name: string, kind: string, size: number){
    //Call api pour l'ajout d'un component (fields)
    fetch("http://localhost:3000/fields?name=" + name + "&kind=" + kind + "&size=" + size, 
        {"method":"POST"}
    )
}
