import React from 'react'
import { Outlet, Link } from "react-router-dom"

export const Records = () => {
  return (
    <>
        <ul className='py-2 space-y-2'>
            <li>
                <Link to="/registros/egresos" className='nav-link'><span className='ml-3'> Egresos </span></Link>
            </li>
            <li>
                <Link to="/registros/ingresos" className='nav-link'><span className='ml-3'> Ingresos </span></Link>
            </li>
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
