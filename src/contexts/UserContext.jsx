import React, { useState, createContext } from 'react'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        const storagedUser = window.localStorage.getItem("user")
        return JSON.parse(storagedUser)
    });

    const saveUser = (data, token) => {
        let input = {...data, token}
        setUser(input)
        window.localStorage.setItem("user", JSON.stringify(input))
    }

    const contx = { user, saveUser }

    return (
        <UserContext.Provider value={ contx } >
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider