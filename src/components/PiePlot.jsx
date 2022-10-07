import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { UserContext } from '../contexts/UserContext';
import { useFetch } from '../hooks/useFetch';
import { getSummary } from '../api/RecordService';
import { getColor, getRandomColor } from '../utils/utils';

export const PiePlot = ({ title, groupBy, filterList }) => {
    const { user } = useContext(UserContext)
    const { body, loading } = useFetch(getSummary(user, groupBy))

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor='middle' dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
    };

    return (
        <>
        {
            loading? "Cargando..." : 
                <div className='card'>
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
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(index)} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
        }
        </>
    )
}
