import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { useUserContext } from '../context/user.context';
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useUserContext();

  function loginUser(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields")
      return;
    }

    axios
      .post('/user/login', {
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
          toast.error("Failed to login. Please try again.");
        }
      })
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-52'>
        <h1 className='text-4xl font-semibold text-center mb-4'>Login</h1>
        <form onSubmit={loginUser} className='max-w-md mx-auto'>
          <input
            type="email"
            placeholder='your@email.com'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className='primary'>
            Login
          </button>
          <div className='text-center py-2 text-gray-600'>
            Don't have an account?
            <Link to="/register" className='underline text-black ' > Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage