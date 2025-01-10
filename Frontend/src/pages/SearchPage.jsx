import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PlaceCards from '../components/PlaceCards';
import IndexCardShimmer from '../components/IndexCardShimmer';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');
  const name = searchParams.get('name');

  useEffect(() => {
    setLoading(true);
    axios.post(`/places/s?location=${location}&name=${name}`)
      .then(({ data }) => {
        setFilteredPlaces(data.places);
      })
      .catch(({ response }) => {
        toast.error(response.data.message || "Something went wrong, try again later")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [location, name])

  if (loading) {
    return (
      <IndexCardShimmer />
    )
  }

  return (
    (filteredPlaces.length === 0) ? (
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-center text-3xl font-semibold mt-8'>No places found. Try something else</h1>
        <Link to={'/'} className='bg-primary cursor-pointer text-white py-2 px-4 rounded-full text-xl'>Go back to homepage</Link>
      </div>
    ) : (
      <PlaceCards places={filteredPlaces} />
    )
  )
}

export default SearchPage