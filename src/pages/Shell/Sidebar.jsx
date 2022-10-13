import React from 'react'
import { Link } from "react-router-dom"
import { NavItem } from '../../components/NavItem'

export const Sidebar = () => {
    return (
        <aside className="w-60 h-screen py-2 px-3 bg-back-800 fixed">
            <h1 className="text-2xl text-back-100 py-4 px-2"> 
                <Link to="/"> Rec an Dec </Link> 
            </h1>
            <nav>
                <ul>
                    <NavItem to="/" title="Resumenes"/>
                    
                    <li>
                        <Link to="/registros/egresos" className='nav-link'>
                            <span className='ml-3'> Registros </span>
                        </Link>
                        <ul className='py-2 space-y-2'>
                            <NavItem to="/registros/egresos" title="Egresos" type="nav-sublink"/>
                            <NavItem to="/registros/ingresos" title="Ingresos" type="nav-sublink"/>
                        </ul>
                    </li>

                    <li>
                        <Link to="/configuracion/categorias" className='nav-link'>
                            <span className='ml-3'> Configuracion </span>
                        </Link>
                        <ul className='py-2 space-y-2'>
                            <NavItem to="/configuracion/categorias" title="Categorias" type="nav-sublink"/>
                            <NavItem to="/configuracion/etiquetas" title="Etiquetas" type="nav-sublink"/>
                            <NavItem to="/configuracion/billeteras" title="Billeteras" type="nav-sublink"/>
                            <NavItem to="/configuracion/limites" title="Limites" type="nav-sublink"/>
                            <NavItem to="/configuracion/telegram" title="Telegram" type="nav-sublink"/>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
