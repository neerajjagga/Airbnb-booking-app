import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('');
    const [phoneNumber , setphoneNumber ] = useState('');
    const [redirect, setRedirect] = useState('');

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    function handleBooking(e) {
        e.preventDefault();
        if (!checkIn || !checkOut || !name || !phoneNumber  || numberOfGuests < 1) {
            toast.error("Please fill out all required fields.");
            return;
        }
        axios.post('/bookings/new', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phoneNumber,
            price : numberOfNights * place.price,
            placeId: place._id
        })
            .then(({ data }) => {
                toast.success(data.message);
                setRedirect('/account/bookings')
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <form onSubmit={(e) => handleBooking(e)}>
            <div className='bg-white shadow rounded-2xl p-4'>
                <div className='text-2xl text-center'>
                    Price : {place.price} / night
                </div>
                <div className='border rounded-2xl mt-4'>
                    <div className="flex">
                        <div className='py-3 px-6 border-r-2 flex flex-col w-1/2'>
                            <label>Check in <span className=" text-red-400">*</span></label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) =>
                                    setCheckIn(e.target.value)}
                                required
                            />
                        </div>
                        <div className='py-3 px-6 border-l-2 flex flex-col w-1/2'>
                            <label>Check Out<span className=" text-red-400">*</span></label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) =>
                                    setCheckOut(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='py-3 px-4 border-t-2'>
                        <label>Number of guests:<span className=" text-red-400">*</span></label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            required
                        />
                    </div>
                    <div className='py-3 px-4 border-t-2'>
                        <label>Your name:<span className=" text-red-400">*</span></label>
                        <input
                            type="text"
                            value={name}
                            placeholder="John Doe"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Phone Number:<span className=" text-red-400">*</span></label>
                        <input
                            type="tel"
                            value={phoneNumber }
                            onChange={(e) => setphoneNumber (e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className='primary mt-4'>
                    Book this place
                    {numberOfNights > 0 && (
                        <span className="font-bold"> - ${numberOfNights * place.price * numberOfGuests}</span>
                    )}
                </button>
            </div>
        </form>
    )
}

export default BookingWidget