import '../index.css'

export default function App() {
    return (
        <>
            <nav className="flex bg-zinc-800 bg-opacity-40 mx-5 md:mx-40 xl:mx-80 my-2 p-4 pb-5 rounded-2xl">
                <div className="flex-1">
                    <a href="/">
                        [img] myapp
                    </a>
                </div>

                <div className="flex-2">
                    <a href="/login" className="ml-auto font-bold">
                        Sign in
                    </a>
                </div>
            </nav>
            <div className="my-10"></div>
        </>
    )
}