import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import axios from 'axios';
import { toast } from "react-toastify";
import AccountNav from '../components/AccountNav';
import { useState, useEffect } from 'react';


const AccountPage = () => {
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const [editedName, setEditedName] = useState('')

  // check the activate route 

  useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
    }
  }, [user]);

  const handleLogout = async () => {
    axios.post('/user/logout')
      .then((res) => {
        toast.success(res.data.message);
        setUser(null)
        navigate('/login')
      })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    axios.post('/user/edit', {
      name: editedName,
    })
      .then(({ data }) => {
        toast.success(data.message)
        setUser({ ...user, name: editedName });
        setEditState(false)
      })
      .catch(error => {
        toast.error(error.response.data.message || "Failed to update profile");
      })
  }

  const handleCancel = async (e) => {
    setEditState(false);
    setEditedName(user?.name)
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
            {!editState ? <h1 className="text-4xl font-semibold">{user.name}</h1> : (
              <div className='flex items-center gap-2'>
                <input type="text" className='text-xl font-semibold' value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                <button
                  onClick={(e) => handleSave(e)}
                  disabled={editedName === user?.name}
                  className={`${editedName === user?.name ? 'bg-gray-300' : 'bg-green-600'} py-2 px-4 rounded-full text-white text-lg`}>
                  Save
                </button>
                <button
                  onClick={(e) => handleCancel(e)}
                  className='bg-red-600 py-2 px-4 rounded-full text-white text-lg'>Cancel</button>
              </div>
            )}
            <span className='text-xl'>Member</span>
          </div>
          <div className='flex gap-4'>
            <button
              className='bg-primary py-2 px-4 rounded-full text-white text-lg'
              onClick={() => {
                handleLogout()
              }}
            >
              Logout
            </button>
            <button
              className='bg-green-600 py-2 px-4 rounded-full text-white text-lg'
              onClick={() => {
                setEditState(true)
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default AccountPage