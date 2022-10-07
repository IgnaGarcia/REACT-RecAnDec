import React from 'react'
import { LinesPlot } from '../../components/LinesPlot';
import { PiePlot } from '../../components/PiePlot';
import { Balance } from './Balance'

export const Home = () => {
    return (
        <div>
            <Balance />
            <LinesPlot title="Historial de Ingresos y Egresos" groupBy="isOut" 
                filterList={null} />
            <PiePlot title="Gastos por Categoria" groupBy="category" 
                filterList={null} />
        </div>
    )
}
