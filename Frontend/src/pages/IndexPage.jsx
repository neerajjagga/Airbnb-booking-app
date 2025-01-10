import { useEffect, useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import IndexCardShimmer from "../components/IndexCardShimmer";
import PlaceCards from "../components/PlaceCards";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('/places/all')
            .then(({ data }) => {
                setPlaces([...data.allPlaces]);
            })
            .catch(({response}) => {
                if(response.data.message === "Please log in.") {
                    navigate('/login')
                }
                toast.error(response.data.message || "Something went wrong, try again later")
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if(loading) {
        return (
          <IndexCardShimmer />
        )
    }

    return (
      <PlaceCards places={places} />
    )
}