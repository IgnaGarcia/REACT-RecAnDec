import React from 'react'
import { Chip } from '../../../components/Chip'
import { LimitModal } from './LimitModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { getLimites } from '../../../api/LimitsService'

export const Limits = () => {
  const getPeriod = (el) => {
    return `${el.month}/${el.year}`
  }

  const deleteLimit = (el) => {
    console.log(el)
  }

  const editLimit = (el) => {
    console.log(el)
  }

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
            <button className='btn' onClick={() => deleteLimit(el)}> Borrar </button>
            <button className='btn' onClick={() => editLimit(el)}> Editar </button>
        </td>
    </tr>
  }

  return (
    <ConfigurationTemplate CreateModal={LimitModal}  tableHead={tableHead} tableBody={tableBody} get={getLimites}
      title={"Limites"} createTitle={"Nuevo Limite"} barTitle={"Estado de Limites"}/>
  )
}