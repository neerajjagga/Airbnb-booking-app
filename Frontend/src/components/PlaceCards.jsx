import {Link} from 'react-router-dom';

const PlaceCards = ({places}) => {
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link key={place._id} to={'/places/' + place._id}>
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

export default PlaceCards