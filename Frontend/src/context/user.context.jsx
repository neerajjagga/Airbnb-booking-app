import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
const userContext = createContext({
    user : null,
    setUser : () => {}
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/user/checkAuth')
            .then((res) => {
                setUser(res.data.user);
            })
    }, [])

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    return useContext(userContext);
}