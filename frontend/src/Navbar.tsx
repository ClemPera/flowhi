import './index.css'

function App() {
    return (
        <>
            <nav className="flex bg-zinc-800 bg-opacity-40 mx-60 my-2 p-4 pb-5 rounded-2xl">
                <div className="flex-1">
                    <a href="/">
                        [img] myapp
                    </a>
                </div>

                <div className="flex-2">
                    <a href="/login" className="ml-auto">
                        Sign in
                    </a>
                </div>
            </nav>
        </>
    )
}

export default App
