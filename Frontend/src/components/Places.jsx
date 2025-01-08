import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import PlacesForm from './PlacesForm';

const Places = () => {
  const [redirect, setRedirect] = useState('');
  const [myAccomodations, setMyAccomodations] = useState([]);

  const location = useLocation();

  useEffect(() => {
    async function fetchMyPlaces() {
      const { data } = await axios.get('/places/my-places');
      console.log(data);
      setMyAccomodations(data.myPlaces);
    }
    fetchMyPlaces();
  }, [redirect])

  return (
    <div>
      {location.pathname === '/account/places' && (
        <>
          <div className='flex flex-col gap-4 mt-8'>
            {myAccomodations.length > 0 && myAccomodations.map(acc => {
              return (
                <Link to={'/places/' + acc._id} className='flex bg-gray-100 gap-4 p-4 rounded-2xl cursor-pointer'>
                  <div className='w-1/5 h-auto bg-gray-300 shrink-0 rounded-2xl'>
                    {acc.photos.length > 0 && (
                      <img className='rounded-2xl' src={'http://localhost:3000/uploads/' + acc.photos[0]} alt="Photo" />
                    )}
                  </div>
                  <div className='grow-0 shrink'>
                    <h1 className='text-xl font-semibold'>{acc.title}</h1>
                    <p className='mt-2 text-sm text-gray-800'>{acc.description}</p>
                  </div>
                </Link>
              )
            }
            )}
          </div>
          <div className='text-center mt-10'>
            <Link className='inline-flex bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add new place
            </Link>
          </div>
        </>
      )}
      {location.pathname === '/account/places/new' && (
        <PlacesForm redirect={redirect} setRedirect={setRedirect} />
      )}
    </div>
  )
}

export default Places