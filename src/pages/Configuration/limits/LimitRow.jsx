import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Chip } from '../../../components/Chip'
import { deleteLimit } from '../../../api/LimitsService'
import { EditLimitModal } from './EditLimitModal'

export const LimitRow = ({el, idx}) => {
    const { user } = useContext(UserContext)
    const deleteResponse = useLazyFetch()
    const [editOpen, setEditOpen] = useState(false)
    const getPeriod = (el) => {
        return `${el.month}/${el.year}`
    }

    const onDeleteLimit = (el) => {
        deleteResponse.run(deleteLimit(user, el._id))
    }

    useEffect(() => {
        if(!deleteResponse.loading && (deleteResponse.error || deleteResponse.body)){
            if (deleteResponse.error) {
                alert("Error al Enviar");
            } else {
                alert("Limite Eliminado");
            }
        }
    }, [deleteResponse.loading])

    return <tr className='h-7' key={`limit-${idx}`}>
        <td> 
            <div className='flex justify-center items-center content-center flex-wrap'>
            <Chip index={idx} label={el.category.label}/> 
            </div>
        </td>
        <td className='border-l h-full'> {el.amount} </td>
        <td className='border-l h-full'> {el.acum} </td>
        <td className='border-l h-full'> {getPeriod(el)} </td>
        <td className='border-l h-full'> 
            <button className='btn-mini' onClick={() => setEditOpen(true)}> Editar </button>
            <button className='btn-mini bg-red-600' onClick={() => onDeleteLimit(el)}> Borrar </button>
        </td>
        { editOpen? <EditLimitModal toggleOpen={setEditOpen} limit={el}/> : "" }
    </tr>
}