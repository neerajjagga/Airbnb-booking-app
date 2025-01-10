import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import PlacesForm from './PlacesForm';

const Places = () => {
  const [redirect, setRedirect] = useState('');
  const [myAccomodations, setMyAccomodations] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true)
    async function fetchMyPlaces() {
      const { data } = await axios.get('/places/my-places');
      setMyAccomodations(data.myPlaces);
      setLoading(false)
    }
    fetchMyPlaces();
  }, [redirect])

  if (loading) {
    return (
      <div className='flex flex-col gap-5 mt-10'>
        <div className='h-44 bg-gray-300 rounded-2xl'></div>
        <div className='h-44 bg-gray-300 rounded-2xl'></div>
        <div className='h-44 bg-gray-300 rounded-2xl'></div>
        <div className='h-44 bg-gray-300 rounded-2xl'></div>
      </div>
    )
  }

  return (
    <div>
      {location.pathname === '/account/places' && (
        <>
          <div className='flex flex-col gap-4 mt-8'>
            {myAccomodations.length > 0 ? (
              myAccomodations.map(acc => {
                return (
                  <Link key={acc._id} to={'/places/' + acc._id} className='flex bg-gray-100 gap-4 p-4 rounded-2xl cursor-pointer'>
                    <div className='w-44 flex shrink-0 lg:w-1/6'>
                      {acc.photos.length > 0 && (
                        <img className='aspect-square object-cover rounded-2xl shadow-xl' src={'http://localhost:3000/uploads/' + acc.photos[0]} alt="Photo" />
                      )}
                    </div>
                    <div className='grow-0 shrink'>
                      <h1 className='text-xl font-semibold'>{acc.title}</h1>
                      <p className='mt-2 text-sm text-gray-800'>{acc.description}</p>
                    </div>
                  </Link>
                )
              })) : (
              <div className='text-center text-3xl font-semibold'>No Accomodations yet</div>
            )}
          </div>
          <div className='text-center mt-8'>
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