import React from 'react'
import { LimitModal } from './LimitModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { getLimites } from '../../../api/LimitsService'
import { LimitRow } from './LimitRow'

export const Limits = () => {

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Categoria </th>
    <th className='border-l border-back-500'> Monto Limite </th>
    <th className='border-l border-back-500'> Acumulado </th>
    <th className='border-l border-back-500'> Periodo </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Acciones </th>
  </tr>

  const tableBody = (el, idx) => <LimitRow el={el} idx={idx} key={`limit-${idx}`}/>

  return (
    <ConfigurationTemplate CreateModal={LimitModal}  tableHead={tableHead} tableBody={tableBody} get={getLimites}
      title={"Limites"} createTitle={"Nuevo Limite"} barTitle={"Estado de Limites"}/>
  )
}