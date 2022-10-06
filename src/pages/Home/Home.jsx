import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { Balance } from './Balance'

export const Home = () => {

    return (
        <div>
            <Balance />
        </div>
    )
}
