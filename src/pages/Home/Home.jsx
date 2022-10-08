import React from 'react'
import { BarsPlot } from '../../components/BarsPlot';
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
            <LinesPlot title="Historial por Categorias" groupBy="category" 
                filterList={null} />

            <PiePlot title="Gastos por Etiqueta" groupBy="tags" 
                filterList={null} />
            <LinesPlot title="Historial por Etiquetas" groupBy="tags" 
                filterList={null} />

            <PiePlot title="Gastos por Billetera" groupBy="wallet" 
                filterList={null} />
            <LinesPlot title="Historial por Billetera" groupBy="wallet" 
                filterList={null} />

            <BarsPlot title="Estado de Limites" />
        </div>
    )
}
