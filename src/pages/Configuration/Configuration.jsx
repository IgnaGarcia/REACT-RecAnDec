import React from 'react'
import { Outlet } from "react-router-dom"
import { TabItem } from '../../components/TabItem'

export const Configuration = () => {
  return (
    <>
        <ul className='tab'>
            <TabItem to="/configuracion/categorias" title="Categorias" />
            <TabItem to="/configuracion/etiquetas" title="Etiquetas" />
            <TabItem to="/configuracion/billeteras" title="Billeteras" />
            <TabItem to="/configuracion/limites" title="Limites" />
            <TabItem to="/configuracion/telegram" title="Telegram" />
        </ul>

        <div>
            <Outlet/>
        </div>
    </>
  )
}
