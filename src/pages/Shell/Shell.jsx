import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { refreshToken } from '../../api/UserService';
import { UserContext } from '../../contexts/UserContext';
import { invalidToken } from '../../utils/utils';
import { Onboarding } from '../Signin/Onboarding';
import { LogedShell } from './LogedShell'

export const Shell = () => {
    const { user, saveUser } = useContext(UserContext)
    const [validToken, setValid] = useState(false)
    let location = useLocation();

    const updateUser = async() => {
        let body = await refreshToken(user)
        setValid(true)
        saveUser(body.data, body.token)
    }

    useEffect(() => {
        if(!validToken) {
            if (user && user.token && invalidToken(user)) 
                updateUser()
            else setValid(true)
        }
    }, [validToken])

    useEffect(() => {
        if (user && user.token && invalidToken(user)) {
            setValid(false)
        }
    }, [location])
    
    return (
        user ? validToken && <LogedShell /> : <Onboarding />
    )
}
