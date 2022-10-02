import React from 'react'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Configuration } from '../Configuration/Configuration'
import { Records } from '../Records/Records'

export const Shell = () => {
  return (
    <BrowserRouter>
        <div className='flex'>
            <aside className="w-60 h-screen py-2 px-3 bg-back-800 fixed">
                <h1 className="text-2xl text-back-100 py-4 px-2"> 
                    <Link to="/"> Rec an Dec </Link> 
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" className='nav-link'><span className='ml-3'> Resumenes </span></Link>
                        </li>
                        <li>
                            <Link to="/registros/egresos" className='nav-link'><span className='ml-3'> Registros </span></Link>
                            <ul className='py-2 space-y-2'>
                                <li>
                                    <Link to="/registros/egresos" className='nav-sublink'><span className='ml-3'> Egresos </span></Link>
                                </li>
                                <li>
                                    <Link to="/registros/ingresos" className='nav-sublink'><span className='ml-3'> Ingresos </span></Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/configuracion/categorias" className='nav-link'><span className='ml-3'> Configuracion </span></Link>
                            <ul className='py-2 space-y-2'>
                                <li>
                                    <Link to="/configuracion/categorias" className='nav-sublink'><span className='ml-3'> Categorias </span></Link>
                                </li>
                                <li>
                                    <Link to="/configuracion/etiquetas" className='nav-sublink'><span className='ml-3'> Etiquetas </span></Link>
                                </li>
                                <li>
                                    <Link to="/configuracion/billeteras" className='nav-sublink'><span className='ml-3'> Billeteras </span></Link>
                                </li>
                                <li>
                                    <Link to="/configuracion/telegram" className='nav-sublink'><span className='ml-3'> Telegram </span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className='mb-16 ml-60'>
                <Routes>
                    <Route exact strict path='' element={ <div>home</div> }/>
                    <Route exact strict path='registros' element={ <Records /> }>
                        <Route exact strict path='egresos' element={ <div>ingresos</div> }/>
                        <Route exact strict path='ingresos' element={ <div>egresos</div> }/>
                    </Route>
                    <Route exact strict path='configuracion' element={ <Configuration /> }>
                        <Route exact strict path='categorias' element={ <div>cat</div> }/>
                        <Route exact strict path='etiquetas' element={ <div>tag</div> }/>
                        <Route exact strict path='billeteras' element={ <div>wall</div> }/>
                        <Route exact strict path='telegram' element={ <div>tg</div> }/>
                    </Route>
                </Routes>
            </main>
            <footer className="flex items-center fixed w-screen bottom-0 h-16">
                <div className="w-60 bg-back-800 text-back-100 py-4 px-5">
                    user
                </div>
                <div className='flex items-center bg-back-200 px-3 flex-1 h-full'>
                    some cosas
                </div>
            </footer>
        </div>
    </BrowserRouter>
  )
}
