import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import axios from 'axios';
import { toast } from "react-toastify";
import AccountNav from '../components/AccountNav';


const AccountPage = () => {
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  // check the activate route 

  const handleLogout = async () => {
    axios.post('/user/logout')
      .then((res) => {
        toast.success(res.data.message);
        setUser(null);
        navigate('/')
      })
  }

  return (
    <div>
      <AccountNav />
      {(location.pathname === '/account' && user) ? (
        <div className='w-full flex flex-col items-center mt-8 gap-5 mb-8'>
          <div className='flex flex-col items-center justify-center gap-2 shadow py-10 px-20 rounded-2xl'>
            <span className="bg-black text-white rounded-full w-16
             h-16 flex items-center justify-center text-4xl font-medium">
              {user.name.charAt(0).toUpperCase()}</span>
            <h1 className="text-4xl font-semibold">{user.name}</h1>
            <span className='text-xl'>Member</span>
          </div>
          <button
            className='bg-primary py-2 px-4 rounded-full text-white text-lg'
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default AccountPage