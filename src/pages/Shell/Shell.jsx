import React, { useContext } from 'react'
import { BrowserRouter } from "react-router-dom"
import { UserContext } from '../../contexts/UserContext';
import { LogedShell } from './LogedShell'

export const Shell = () => {
    const { user, saveUser } = useContext(UserContext)

    const setUser = () => {
        saveUser({
            "name": "Igna Garcia",
            "telegramId": "982840555",
            "_id": process.env.REACT_APP_USER_ID
        }, process.env.REACT_APP_USER_TOKEN)
    }

    return (
        <BrowserRouter className='flex'>
            { user && user.token? 
                <LogedShell /> 
                : 
                <button onClick={setUser} className="block my-5 mx-auto text-back-200 bg-back-400 p-3 rounded-lg"> 
                    set user 
                </button>
            }
        </BrowserRouter>
    )
}
