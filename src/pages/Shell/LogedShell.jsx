import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch'

import { getCategories } from '../../api/CategoriesService'
import { getTags } from '../../api/TagsService'
import { getWallets } from '../../api/WalletService'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserContext } from '../../contexts/UserContext'

import { Configuration } from '../Configuration/Configuration'
import { Records } from '../Records/Records'
import { RecordsList } from '../Records/RecordsList'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Home } from '../Home/Home'
import { Tags } from '../Configuration/tags/Tags'
import { Wallets } from '../Configuration/wallets/Wallets'
import { Categories } from '../Configuration/categories/Catgories'
import { Limits } from '../Configuration/limits/Limits'
import { Telegram } from '../Configuration/telegram/Telegram'

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
                        <Route exact strict path='egresos' element={ <RecordsList isOut pageN={1}/> }/>
                        <Route exact strict path='ingresos' element={ <RecordsList pageN={1}/> }/>
                    </Route>
                    <Route exact strict path='configuracion' element={ <Configuration /> }>
                        <Route exact strict path='categorias' element={ <Categories/> }/>
                        <Route exact strict path='etiquetas' element={ <Tags /> }/>
                        <Route exact strict path='billeteras' element={ <Wallets /> }/>
                        <Route exact strict path='limites' element={ <Limits /> }/>
                        <Route exact strict path='telegram' element={ <Telegram /> }/>
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}
