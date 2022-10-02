import React from 'react'
import { Outlet, Link } from "react-router-dom"

export const Configuration = () => {
  return (
    <>
        <ul className='py-2 space-y-2'>
            <li>
                <Link to="/configuracion/categorias" className='nav-link'><span className='ml-3'> Categorias </span></Link>
            </li>
            <li>
                <Link to="/configuracion/etiquetas" className='nav-link'><span className='ml-3'> Etiquetas </span></Link>
            </li>
            <li>
                <Link to="/configuracion/billeteras" className='nav-link'><span className='ml-3'> Billeteras </span></Link>
            </li>
            <li>
                <Link to="/configuracion/telegram" className='nav-link'><span className='ml-3'> Telegram </span></Link>
            </li>
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
