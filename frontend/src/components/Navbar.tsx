import '../index.css'
import logo from '../assets/logo.svg'

export default function App() {
    return (
        <>
            <nav className="flex bg-zinc-800 bg-opacity-40  md:mx-40 xl:mx-80 my-2 p-4 px-8 pb-5 rounded-2xl">
                <a href="/" className=''>
                    <img className='h-8 w-8' src={logo} alt="website logo - sun with flow under (white)"/>
                </a>
                <div className="flex-grow ml-2">
                    <a href="/" className=''>
                        <h1 className="">myapp</h1>
                    </a>
                </div>

                <div className="">
                    <a href="/login" className="ml-auto font-bold">
                        Sign in
                    </a>
                </div>
            </nav>
            <div className="my-10"></div>
        </>
    )
}