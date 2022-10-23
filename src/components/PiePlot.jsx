import React, { useContext, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { UserContext } from '../contexts/UserContext';
import { useFetch } from '../hooks/useFetch';
import { useSelect } from '../hooks/useSelect';
import { getSummary } from '../api/RecordService';
import { getColor, renderCustomizedLabel } from '../utils/utils';
import Select from 'react-select'
import { PeriodCarousel } from './PeriodCarousel';

export const PiePlot = ({ title, groupBy, filterList }) => {
    const { user } = useContext(UserContext)
    const { selected, options, onSelectChange, period, onPeriodChange } = useSelect(filterList, getSummary, user, groupBy)
    const { body, loading } = useFetch(options)
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
                <div className='card flex flex-col'>
                    {mapSummary()}
                    <div className='flex justify-between w-full mb-6'>
                        <h2 className='flex-1 text-xl'> {title} </h2>
                        {filterList? 
                                <Select className="flex-1" options={filterList} value={selected} isMulti isSearchable 
                                    onChange={onSelectChange} hideSelectedOptions={false} />
                        : ""}
                    </div>
                    { data.length === 0? <div className="text-lg flex-1 flex justify-center items-center">No hay datos en esta seleccion</div> :
                        <PieChart
                            className='m-auto'
                            width={500}
                            height={300}
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
                    }
                    <PeriodCarousel period={period} onPeriodChange={onPeriodChange} minPeriod={user.createDate}/>
                </div>
        }
        </>
    )
}
