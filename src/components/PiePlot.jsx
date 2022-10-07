import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { UserContext } from '../contexts/UserContext';
import { useFetch } from '../hooks/useFetch';
import { getSummary } from '../api/RecordService';
import { getColor, renderCustomizedLabel } from '../utils/utils';

export const PiePlot = ({ title, groupBy, filterList }) => {
    const { user } = useContext(UserContext)
    const { body, loading } = useFetch(getSummary(user, groupBy))
    let data = null
    let names = []

    const mapSummary = () => {
        names = []
        data = body.data.map(el => {
            names.push(el._id.label)
            return { name: el._id.label, value: el.acum }
        })
    }

    return (
        <>
        {
            loading? "Cargando..." : 
                <div className='card'>
                    {mapSummary()}
                    <h2 className='text-xl mb-6'> {title} </h2>
                    <PieChart
                        width={500}
                        height={300}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        >
                        <Tooltip />
                        <Legend layout='vertical' verticalAlign='middle' align='right' iconType='circle'/>
                        <Pie
                            dataKey="value"
                            startAngle={360}
                            endAngle={0}
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                        >
                            {data.map((_, idx) => (
                                <Cell key={`pie-cell-${idx}`} fill={getColor(idx)} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
        }
        </>
    )
}
