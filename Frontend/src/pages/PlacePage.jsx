import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import BookingWidget from '../components/BookingWidget';

const PlacePage = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!placeId) {
      return;
    }
    axios.get('/places/' + placeId)
      .then(({ data }) => {
        setPlace(data.place);
      })
      .catch(err => {
        toast.error('Try again later');
      })
  }, [placeId])

  if (!place) {
    return (
      <>
        <div className="space-y-4 mt-4">
          <div className="w-full h-16 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-16 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </>
    )
  }

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-white min-h-screen'>
        <div className='p-8 grid gap-4'>
          <div className='flex gap-8 items-center pr-16 fixed top-0 py-3 bg-white w-full'>
            <button onClick={() => setShowAllPhotos(false)} className='bg-transparent transition rounded-full p-1 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7">
                <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
            <h2 className='text-2xl font-semibold truncate'>Photos of {place.title}</h2>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div>
              <img src={'http://localhost:3000/uploads/' + photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-6'>
      <h1 className='text-2xl'>{place.title}</h1>
      <div className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <a className='my-2 block font-semibold underline' href={"https://maps.google.com/?q=" + place.address} target='_blank'>{place.address}</a>
      </div>
      <div className="relative">
        <div className='grid gap-2 grid-cols-[2fr_1fr] mt-5'>
          <div>
            {place.photos?.[0] && (
              <div className='aspect-square object-cover rounded-2xl overflow-hidden'>
                <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer' src={'http://localhost:3000/uploads/' + place.photos?.[0]} alt="" />
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)} className=' cursor-pointer rounded-tr-2xl' src={'http://localhost:3000/uploads/' + place.photos?.[1]} alt="" />
            )}
            <div className='overflow-hidden'>
              {place.photos?.[2] && (
                <img onClick={() => setShowAllPhotos(true)} className= 'cursor-pointer relative top-2' src={'http://localhost:3000/uploads/' + place.photos?.[2]} alt="" />
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className='flex items-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white text-black rounded-xl font-semibold'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M.99 5.24A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25l.01 9.5A2.25 2.25 0 0 1 16.76 17H3.26A2.267 2.267 0 0 1 1 14.74l-.01-9.5Zm8.26 9.52v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 0 0 .627-.74Zm1.5 0a.75.75 0 0 0 .627.74h5.373a.75.75 0 0 0 .75-.75v-.615a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625Zm6.75-3.63v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75ZM17.5 7.5v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75Z" clipRule="evenodd" />
          </svg>
          Show all photos
        </button>
      </div>
      <div className='grid mb-8 mt-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
          </div>
          Check-in : {place.checkIn} <br />
          check-out : {place.checkOut} <br />
          Max Number of guests : {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place}/>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t-2">
        <div>
          <h2 className='font-semibold text-2xl'>Extra Info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default PlacePage