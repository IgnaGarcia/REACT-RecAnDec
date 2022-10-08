import React, { useContext } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UserContext } from '../contexts/UserContext';
import { useFetch } from '../hooks/useFetch';
import { getColor } from '../utils/utils';
import { getLimites } from '../api/LimitsService';

export const BarsPlot = ({ title }) => {
    const { user } = useContext(UserContext)
    const { body, loading } = useFetch(getLimites(user))
    let data = null

    const mapSummary = () => {
        data = []
        let today = new Date()
        body.data.forEach(el => {
            if(today.getMonth() + 1 == el.month && today.getFullYear() == el.year) {
                data.push({ name: el.category.label, Acumulado: el.acum, "Porcentaje Usado": ((el.acum*100)/el.amount).toFixed(1), Limite: el.amount })
            }
        })
    }

    return (
        <>
        {
            loading? "Cargando..." : 
                <div className='card'>
                    {mapSummary()}
                    <h2 className='text-xl mb-6'> {title} </h2>
                    <BarChart
                        layout='vertical'
                        width={550}
                        height={300}
                        data={data}
                        margin={{ left: 70, right: 35 }}
                        barSize={15}
                        >
                        <Tooltip />
                        <CartesianGrid strokeDasharray="50 5" />
                        <XAxis type="number" xAxisId={0}/>
                        <XAxis type="number" xAxisId={1} orientation="top" stroke={getColor(2)} />
                        <YAxis type="category" dataKey="name" yAxisId={0} />
                        <Bar dataKey="Porcentaje Usado" xAxisId={1}>
                            {
                                data.map((el, idx) => 
                                    <Cell fill={getColor(2)} key={`bar-cell-percent-${0}`}/>
                                )
                            }
                        </Bar>
                        <Bar dataKey="Acumulado" xAxisId={0}>
                            {
                                data.map((el, idx) => 
                                    <Cell fill={getColor(0)} key={`bar-cell-status-${0}`}/>
                                )
                            }
                        </Bar>
                        <Bar dataKey="Limite" xAxisId={0}>
                            {
                                data.map((el, idx) => 
                                    <Cell fill={getColor(1)} key={`bar-cell-limit-${0}`}/>
                                )
                            }
                        </Bar>
                    </BarChart>
                </div>
        }
        </>
    )
}
