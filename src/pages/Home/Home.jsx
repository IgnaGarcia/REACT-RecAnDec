import React from 'react'
import { useContext } from 'react';
import { BarsPlot } from '../../components/BarsPlot';
import { LinesPlot } from '../../components/LinesPlot';
import { PiePlot } from '../../components/PiePlot';
import { ConfigContext } from '../../contexts/ConfigContext';
import { Balance } from './Balance'

export const Home = () => {
    const { categories, tags, wallets } = useContext(ConfigContext)

    let categoriesList = categories.data.map(el => {
        return { value: el._id, label: el.label }
    })
    let tagsList = tags.data.map(el => {
        return { value: el._id, label: el.label }
    })
    let walletsList = wallets.data.map(el => {
        return { value: el._id, label: el.label }
    })

    return (
        <div className='grid grid-cols-2 gap-4 px-4 py-12'>
            <h2 className='text-3xl col-span-2 px-6'> Resumen General </h2>
            <Balance />
            <LinesPlot title="Historial de Ingresos y Egresos" groupBy="isOut" 
                filterList={null} />

            <h2 className='text-3xl col-span-2 px-6 mt-6'> Categorias </h2>
            <PiePlot title="Gastos por Categoria" groupBy="category" 
                filterList={categoriesList} />
            <LinesPlot title="Historial por Categorias" groupBy="category" 
                filterList={categoriesList} />

            <h2 className='text-3xl col-span-2 px-6 mt-6'> Etiquetas </h2>
            <PiePlot title="Gastos por Etiqueta" groupBy="tags" 
                filterList={tagsList} />
            <LinesPlot title="Historial por Etiquetas" groupBy="tags" 
                filterList={tagsList} />

            <h2 className='text-3xl col-span-2 px-6 mt-6'> Billeteras </h2>
            <PiePlot title="Gastos por Billetera" groupBy="wallet" 
                filterList={walletsList} />
            <LinesPlot title="Historial por Billetera" groupBy="wallet" 
                filterList={walletsList} />

            <h2 className='text-3xl col-span-2 px-6 mt-6'> Limites </h2>
            <BarsPlot title="Estado de Limites" />
        </div>
    )
}
