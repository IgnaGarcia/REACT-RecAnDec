import React, { useContext } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UserContext } from '../contexts/UserContext';
import { useFetch } from '../hooks/useFetch';
import { getHistorical } from '../api/RecordService';
import { getColor } from '../utils/utils';

export const LinesPlot = ({ title, groupBy, filterList }) => {
    const { user } = useContext(UserContext)
    const { body, loading } = useFetch(getHistorical(user, groupBy))
    let data = null
    let names = []

    const mapHistorical = () => {
        let res = {}
        data = null
        names = []
        
        Object.entries(body.data).forEach(el => {
            // Obtener el nombre del Tipo de Acumulado
            let acumName = (el[0] !== "true" && el[0] !== "false") ? el[0] :
                (el[0] === "true")? "Egreso" : "Ingreso"
            names.push(acumName)
            
            el[1].forEach(subel => {
                if(res[`${subel.month}/${subel.year}`]) {
                    res[`${subel.month}/${subel.year}`][acumName] = subel.acum
                } else {
                    res[`${subel.month}/${subel.year}`] = {
                        name: `${subel.month}/${subel.year}`,
                        month: subel.month,
                        year: subel.year,
                        [acumName]: subel.acum
                    }
                }
            })
        })
        data = Object.values(res).sort((a, b) =>  
            a.year - b.year === 0 ? a.month - b.month : a.year - b.year )
    }

    return (
        <>
        {
            loading? "Cargando..." : 
                <div className='card'>
                    { mapHistorical() }
                    <h2 className='text-xl mb-6'> {title} </h2>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}>
                        <CartesianGrid strokeDasharray="50 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend iconType='circle'/>
                        {
                            names.map((lineName, idx) => <Line key={lineName.name} dataKey={lineName} stroke={getColor(idx)} type="monotone" /> )
                        }
                    </LineChart>
                </div>
        }
        </>
    )
}
