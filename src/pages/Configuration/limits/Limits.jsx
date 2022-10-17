import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Chip } from '../../../components/Chip'
import { LimitModal } from './LimitModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { getLimites, deleteLimit } from '../../../api/LimitsService'
import { EditLimitModal } from './EditLimitModal'

export const Limits = () => {
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

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Categoria </th>
    <th className='border-l border-back-500'> Monto Limite </th>
    <th className='border-l border-back-500'> Acumulado </th>
    <th className='border-l border-back-500'> Periodo </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Acciones </th>
  </tr>

  const tableBody = (el, idx) => {
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
            <button className='btn' onClick={() => onDeleteLimit(el)}> Borrar </button>
            <button className='btn' onClick={() => setEditOpen(true)}> Editar </button>
        </td>
        { editOpen? <EditLimitModal toggleOpen={setEditOpen} limit={el}/> : "" }
    </tr>
  }

  return (
    <ConfigurationTemplate CreateModal={LimitModal}  tableHead={tableHead} tableBody={tableBody} get={getLimites}
      title={"Limites"} createTitle={"Nuevo Limite"} barTitle={"Estado de Limites"}/>
  )
}