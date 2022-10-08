import React from 'react'
import { Link } from "react-router-dom"

export const NavItem = ({ to, title, type='nav-link' }) => {
    return (
        <li>
            <Link to={ to } className={ type }>
                <span className='ml-3'> { title } </span>
            </Link>
        </li>
    )
}
