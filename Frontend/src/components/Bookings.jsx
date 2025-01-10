import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

const Bookings = () => {

  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)    
    axios.get('/bookings/me')
      .then(({ data }) => {
        setMyBookings(data.bookings)
      })
      .catch(({ response }) => {
        toast.error(response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col gap-5 mt-10'>
        <div className='h-44 bg-gray-300 rounded-2xl lg:h-1/6'></div>
        <div className='h-44 bg-gray-300 rounded-2xl lg:h-1/6'></div>
        <div className='h-44 bg-gray-300 rounded-2xl lg:h-1/6'></div>
        <div className='h-44 bg-gray-300 rounded-2xl lg:h-1/6'></div>
        <div className='h-44 bg-gray-300 rounded-2xl lg:h-1/6'></div>
      </div>
    )
  }

  function handleCancelBooking(bookingId) {
    axios.post('/bookings/cancel', {
      bookingId,
    })
      .then(({data}) => {
        setMyBookings(data.myBookings);
        toast.success(data.message);
      })
      .catch(({response}) => {
        toast.error(response.data.message);
      })
  }

  return (
    <div className='flex flex-col gap-5 mt-10'>
      {myBookings.length > 0 ? (
        myBookings.map((booking, index) => (
             <Link to={'/places/' + booking.placeId._id} key={index} className='flex gap-5 bg-gray-200 py-2 px-2 rounded-2xl'>
             {booking?.placeId.photos?.length > 0 && (
               <div className='w-44 flex shrink-0 lg:w-1/6'>
                 <img className='aspect-square object-cover rounded-2xl shadow-xl' src={'http://localhost:3000/uploads/' + booking?.placeId.photos[0]} alt="" />
               </div>
             )}
             <div className='py-2 mr-1 overflow-hidden flex flex-col gap-4 w-full'>
               <div className=''>
                 <h2 className='truncate text-xl font-semibold lg:text-3xl'>{booking.placeId.title}</h2>
               </div>
               <div className='flex flex-col gap-3 text-gray-600 lg:gap-5'>
                 <div className='flex gap-1 items-center'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                   </svg>
                   <h3 className='text-lg font-semibold lg:text-2xl'>
                     {differenceInCalendarDays(booking.checkOut, booking.checkIn)} nights
                   </h3>
                 </div>
                 <div className='flex gap-2 items-center font-semibold text-lg lg:text-2xl'>
                   <div className='flex gap-2 items-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                     </svg>
                     <h3>{booking.checkIn}</h3>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                     </svg>
                   </div>
                   <div className='flex gap-2 items-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                     </svg>
                     <h3>{booking.checkOut}</h3>
                   </div>
                 </div>
                 <div className='flex justify-between'>
                   <div className='flex gap-1 font-semibold text-black text-xl items-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                     </svg>
                     <h2 className='lg:text-2xl'>Total price : ${booking.price}</h2>
                   </div>
                   <button onClick={(e) => {
                     e.preventDefault();
                     handleCancelBooking(booking._id);
                   }}
                     className='bg-red-500 cursor-pointer text-white py-2 px-4 rounded-full'>Cancel</button>
                 </div>
               </div>
             </div>
           </Link>
      ))) : (
       <Link to={'/'} className='flex flex-col gap-5 items-center'>
         <h1 className='text-center text-3xl font-semibold'>No bookings yet</h1>
         <button className='bg-primary inline-flex text-white py-2 px-6 rounded-full'>Book Now</button>
       </Link>
      )}
    </div>
  )
}

export default Bookings