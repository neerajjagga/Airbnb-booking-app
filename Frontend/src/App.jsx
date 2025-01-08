import './App.css'
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
      <ToastContainer position="bottom-right" autoClose={2000} newestOnTop closeButton pauseOnHover={false} />
    </div>
  )
}

export default App