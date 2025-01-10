import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import { useUserContext } from '../context/user.context';
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserContext();

    function registerUser(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill in all fields")
            return;
        }
        axios
            .post('/user/register', {
                name,
                email,
                password,
            })
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setUser(res.data.user);
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to register. Please try again.");
                }
            })
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='-mt-52'>
                <h1 className='text-4xl font-semibold text-center mb-4'>Register</h1>
                <form
                    className='max-w-md mx-auto'
                    onSubmit={registerUser}
                >
                    <input
                        type="text"
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button
                        className='primary'>
                        Create Account
                    </button>
                    <div className='text-center py-2 text-gray-600'>
                        Already a member
                        <Link to="/login" className='underline text-black ' > Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage