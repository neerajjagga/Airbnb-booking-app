import { useEffect, useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/places/all')
            .then(({ data }) => {
                setPlaces([...data.allPlaces]);
            })
            .catch(({response}) => {
                toast.error(response.data.message || "Something went wrong, try again later")
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if(loading) {
        return (
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="h-96 bg-gray-300 rounded-2xl mb-2"></div>
                <div className="h-96 bg-gray-300 rounded-2xl mb-2"></div>
                <div className="h-96 bg-gray-300 rounded-2xl mb-2"></div>
                <div className="h-96 bg-gray-300 rounded-2xl mb-2"></div>
                <div className="h-96 bg-gray-300 rounded-2xl mb-2"></div>
            </div>
        )
    }

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/places/'+place._id}>
                    <div className="bg-gray-500 rounded-2xl mb-2">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt="sad" />
                        )}
                    </div>
                    <h2 className="text-sm truncate">{place.address}</h2>
                    <h3 className="font-bold truncate">{place?.title}</h3>
                    <div className="mt-1">
                        <span className="font-semibold"> ${place.price} </span> night
                    </div>
                </Link>
            ))}
        </div>
    )
}