import React from 'react'
import { Outlet } from "react-router-dom"
import { TabItem } from '../../components/TabItem'

export const Records = () => {
  return (
    <>
        <ul className='tab'>
            <TabItem to="/registros/egresos" title="Egresos"/>
            <TabItem to="/registros/ingresos" title="Ingresos"/>
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
