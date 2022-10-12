import React, { useContext } from 'react'
import { getBalance } from '../../api/RecordService';
import { UserContext } from '../../contexts/UserContext';
import { useFetch } from '../../hooks/useFetch';

export const Balance = () => {
    const { user } = useContext(UserContext)
    const { loading, body } = useFetch(getBalance(user))

    return (
        <>
        {
            loading? "Cargando..." :
                <div className='card py-8 flex flex-col justify-around'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-2xl'> Balance del mes {body.data[0]._id.month}/{body.data[0]._id.year}</h2>
                        <h3 className='text-3xl font-semibold'> { body.data[0].income - body.data[0].expense } </h3>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-2/5'>
                            <h4 className='text-xl font-semibold mb-4'> Egresos </h4>
                            <p className='flex justify-between mb-2'> Mes Actual: <span>{body.data[0].expense}</span> </p>
                            <p className='flex justify-between mb-2'> Mes Anterior: <span>{body.data[1].expense}</span> </p>
                            <p className='flex justify-between mb-2'> Promedio: <span>{ (body.data[2].expense / body.data[2].countExpense).toFixed(2) }</span> </p>
                            <p className='flex justify-between mb-2'> Registros de Este Mes: <span>{body.data[0].countExpense}</span> </p>
                            <p className='flex justify-between mb-2'> Registros Totales: <span>{body.data[2].countExpense}</span> </p>
                        </div>
                        <div className='w-2/5'>
                            <h4 className='text-xl font-semibold mb-4'> Ingresos </h4>
                            <p className='flex justify-between mb-2'> Mes Actual: <span>{body.data[0].income}</span> </p>
                            <p className='flex justify-between mb-2'> Mes Anterior: <span>{body.data[1].income}</span> </p>
                            <p className='flex justify-between mb-2'> Promedio: <span>{ (body.data[2].income / body.data[2].countIncome).toFixed(2) }</span> </p>
                            <p className='flex justify-between mb-2'> Registros de Este Mes: <span>{body.data[0].countIncome}</span> </p>
                            <p className='flex justify-between mb-2'> Registros Totales: <span>{body.data[2].countIncome}</span> </p>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}
