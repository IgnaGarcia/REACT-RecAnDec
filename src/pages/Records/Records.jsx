import React from 'react'
import { Outlet } from "react-router-dom"
import { NavItem } from "../../components/NavItem"

export const Records = () => {
  return (
    <>
        <ul className='py-2 space-y-2'>
            <NavItem to="/registros/egresos" title="Egresos" />
            <NavItem to="/registros/ingresos" title="Ingresos" />
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
