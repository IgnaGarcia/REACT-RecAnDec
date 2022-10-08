import React from 'react'
import { Outlet, Link } from "react-router-dom"
import { NavItem } from '../../components/NavItem'

export const Configuration = () => {
  return (
    <>
        <ul className='py-2 space-y-2'>
            <NavItem to="/configuracion/categorias" title="Categorias" />
            <NavItem to="/configuracion/etiquetas" title="Etiquetas" />
            <NavItem to="/configuracion/billeteras" title="Billeteras" />
            <NavItem to="/configuracion/telegram" title="Telegram" />
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
