import { useState } from 'react';
import Perks from './Perks';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'

const PlacesForm = ({redirect, setRedirect}) => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setphotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);

    function addPhotoByLink(e) {
        e.preventDefault();

        axios.post('/places/upload-image-by-link', {
            link: photoLink
        })
            .then(({ data }) => {
                toast.success(data.message);
                setphotos(prev => {
                    return [...prev, data.filename]
                })
            })
            .catch(() => {
                toast.error("Enter valid url");
            })
        setPhotoLink('');
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/places/upload-photos', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((res) => {
                const { data: files } = res;

                for (let i = 0; i < files.length; i++) {
                    setphotos(prev => {
                        return [...prev, files[i].filename]
                    })
                }
            })
    }

    function addNewPlace(e) {
        e.preventDefault();
        const placeData = {
            title,
            address,
            photos,
            description,
            perks,
            price,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        }
        axios.post('/places/new', placeData)
            .then(({ data }) => {
                toast.success(data.message);
                setRedirect('/account/places')
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
            })
    }

    function removePhoto(e, filename) {
        e.preventDefault();
        setphotos([...photos.filter(photo => photo !== filename)])
    }

    function photoAsMain(e, filename) {
        e.preventDefault();
        setphotos([filename, ...photos.filter(photo => photo !== filename)])
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <form onSubmit={addNewPlace}>
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'>Title for your place, should be short and catchy</p>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='title, for example : My lovely apartment' required />
                <h2 className='text-2xl mt-4'>Address</h2>
                <p className='text-gray-500 text-sm'>Address to this place</p>
                <input value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder='address' />
                <h2 className='text-2xl mt-4'>Photos</h2>
                <p className='text-gray-500 text-sm'>more = better</p>
                <div className='flex gap-2'>
                    <input value={photoLink} onChange={e => setPhotoLink(e.target.value)} type="text" placeholder='Add using link....jpg' />
                    <button onClick={(e) => addPhotoByLink(e)} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                </div>
                <div className='grid gap-1 grid-cols-3 lg:grid-cols-6 md:grid-col-4 mt-2'>
                    {photos.length > 0 && photos.map(link => (
                        <div key={link} className='h-32 flex relative'>
                            <img className='w-full rounded-2xl shadow-md object-cover' src={'http://localhost:3000/uploads/' + link} alt="Image" />
                            <button onClick={(e) => removePhoto(e, link)} className='cursor-pointer absolute bottom-0 right-0 text-white bg-black bg-opacity-50 py-2 px-2 rounded-2xl mb-1 mr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button onClick={(e) => photoAsMain(e, link)} className='cursor-pointer absolute bottom-0 left-0 text-white bg-black bg-opacity-50 py-2 px-2 rounded-2xl mb-1 ml-1'>
                                {link === photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {link !== photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                    <label className='h-32 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 font-semibold flex items-center gap-1 justify-center cursor-pointer'>
                        <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        Upload
                    </label>
                </div>
                <h2 className='text-2xl mt-4'>Description</h2>
                <p className='text-gray-500 text-sm'>Description of the place</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <h2 className='text-2xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>Select the perks of your place</p>
                <Perks perks={perks} setPerks={setPerks} />
                <h2 className='text-2xl mt-4'>Extra Info</h2>
                <p className='text-gray-500 text-sm'>House rules, etc</p>
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                <h2 className='text-2xl mt-4'>Check in&out times</h2>
                <p className='text-gray-500 text-sm'>add check in and out time, remember to have time window for cleaning the room between guests</p>
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time (HH:mm)</h3>
                        <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="text" placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time (HH:mm)</h3>
                        <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="text" placeholder='12:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="number" />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price</h3>
                        <input value={price} onChange={e => setPrice(e.target.value)} type="number" required/>
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesForm