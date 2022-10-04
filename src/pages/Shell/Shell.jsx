import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Configuration } from '../Configuration/Configuration'
import { Records } from '../Records/Records'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { UserContext } from '../../contexts/UserContext';

export const Shell = () => {
    const {user, saveUser } = useContext(UserContext)

    const setUser = () => {
        saveUser({
            "name": "Igna Garcia",
            "telegramId": "982840555",
            "_id": process.env.REACT_APP_USER_ID
        }, process.env.REACT_APP_USER_TOKEN)
    }

    return (
        <BrowserRouter className='flex'>
            { user && user.token? 
                <>
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
                </> : <button onClick={setUser} className="block my-5 mx-auto text-back-200 bg-back-400 p-3 rounded-lg"> set user </button>
            }
        </BrowserRouter>
    )
}
