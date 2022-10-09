import React from 'react'
import { NavLink } from "react-router-dom"

export const TabItem = ({ to, title, type='tab-link' }) => {
    return (
        <li className={type}>
            <NavLink to={ to } className={ ({isActive}) => isActive? `${type}-active` : "" }>  
                { title } 
            </NavLink>
        </li>
    )
}
