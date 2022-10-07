import React from 'react'
import { LinesPlot } from '../../components/LinesPlot';
import { Balance } from './Balance'

export const Home = () => {
    return (
        <div>
            <Balance />
            <LinesPlot title="Historial de Ingresos y Egresos" groupBy="isOut" 
                filterList={null} />
        </div>
    )
}
