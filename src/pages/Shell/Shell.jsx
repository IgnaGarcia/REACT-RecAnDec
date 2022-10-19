import React, { useContext } from 'react'
import { BrowserRouter } from "react-router-dom"
import { generateToken, refreshToken } from '../../api/UserService';
import { UserContext } from '../../contexts/UserContext';
import { invalidToken } from '../../utils/utils';
import { Onboarding } from '../Signin/Onboarding';
import { LogedShell } from './LogedShell'

export const Shell = () => {
    const { user, saveUser } = useContext(UserContext)

    const setUser = async() => {
        let token = await generateToken(process.env.REACT_APP_USER_ID)
        saveUser({
            "name": "Igna Garcia",
            "telegramId": "982840555",
            "createDate": "2022-09-12T02:32:45.919+00:00",
            "_id": process.env.REACT_APP_USER_ID
        }, token)
    }

    const updateUser = async() => {
        let body = await refreshToken(user)
        saveUser(body.data, body.token)
    }

    if (user && user.token && invalidToken(user)) updateUser()

    return (
        <BrowserRouter className='flex'>
            { user && user.token? 
                <LogedShell /> 
                : <Onboarding />
                /*<button onClick={setUser} className="block my-5 mx-auto text-back-200 bg-back-400 p-3 rounded-lg"> 
                    set user 
                </button>*/
            }
        </BrowserRouter>
    )
}
