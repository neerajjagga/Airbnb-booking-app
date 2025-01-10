import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from '../context/user.context';
import { useState } from "react";
import {toast} from 'react-toastify';

const Header = () => {
    const { user } = useUserContext();
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    function handleSearch(e) {
        if(!location && !name) {
            toast.error('Enter something to search');
            return;
        }
        navigate(`/s?location=${location}&name=${name}`)
    }

    return (
        <div>
            <header className='flex gap-5 justify-between lg:gap-0'>
                <Link to="/" className='flex items-center text-primary gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='hidden sm:block text-primary font-bold text-xl'>airbnb</span>
                </Link>
                <div className='flex gap-3 items-center border border-gray-300 rounded-full px-4 shadow-md'>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='font-semibold border-none focus:outline-none' placeholder="location" />
                    <span className='text-gray-300'>|</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className='font-semibold border-none text-lg focus:outline-none' placeholder="name" />
                    <span className='text-gray-300'>|</span>
                    <button className='bg-primary p-[6px] rounded-full' onClick={(e) => handleSearch(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <Link to={user ? "/account" : "/login"} className='flex gap-3 items-center border border-gray-300 rounded-full py-2 px-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div>
                        {user ? (
                            <span className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-medium">
                                {user.name.charAt(0).toUpperCase()}</span>
                        ) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                    </div>
                </Link>
            </header>
        </div>
    )
}

export default Header