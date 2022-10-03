import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Configuration } from '../Configuration/Configuration'
import { Records } from '../Records/Records'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export const Shell = () => {
  return (
    <BrowserRouter className='flex'>
        <Sidebar />
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
        <Footer />
    </BrowserRouter>
  )
}
