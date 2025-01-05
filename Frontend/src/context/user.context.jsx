import { createContext, useContext, useState } from "react";

const userContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    return useContext(userContext);
}