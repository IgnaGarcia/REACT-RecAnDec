import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom"
import { Configuration } from '../Configuration/Configuration'
import { Records } from '../Records/Records'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Home } from '../Home/Home'
import { useFetch } from '../../hooks/useFetch'
import { getCategories } from '../../api/CategoriesService'
import { getTags } from '../../api/TagsService'
import { getWallets } from '../../api/WalletService'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserContext } from '../../contexts/UserContext'

export const LogedShell = () => {
    const { user } = useContext(UserContext)
    const { categories, tags, wallets, saveCategories, saveTags, saveWallets } = useContext(ConfigContext)
    const categoryResponse = useFetch(getCategories(user))
    const tagResponse = useFetch(getTags(user))
    const walletResponse = useFetch(getWallets(user))

    return (
        <>
            { !categories.data && !categoryResponse.loading? saveCategories(categoryResponse.body.data) : "" }
            { !tags.data && !tagResponse.loading? saveTags(tagResponse.body.data) : "" }
            { !wallets.data && !walletResponse.loading? saveWallets(walletResponse.body.data) : "" }
            <Sidebar />
            <main className='mb-16 ml-60'>
                <Routes>
                    <Route exact strict path='' element={ <Home /> }/>
                    <Route exact strict path='registros' element={ <Records /> }>
                        <Route exact strict path='egresos' element={ <div>ingresos</div> }/>
                        <Route exact strict path='ingresos' element={ <div>egresos</div> }/>
                    </Route>
                    <Route exact strict path='configuracion' element={ <Configuration /> }>
                        <Route exact strict path='categorias' element={ <div>cat</div> }/>
                        <Route exact strict path='etiquetas' element={ <div>tag</div> }/>
                        <Route exact strict path='billeteras' element={ <div>wall</div> }/>
                        <Route exact strict path='limites' element={ <div>limites</div> }/>
                        <Route exact strict path='telegram' element={ <div>tg</div> }/>
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}
