import React from 'react'
import { getTags } from '../../../api/TagsService'
import { Chip } from '../../../components/Chip'
import { CreateTagModal } from './CreateTagModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'

export const Tags = () => {
  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return dateStr? 
      `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}` 
      : "-"
  }

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Nombre </th>
    <th className='border-l border-back-500'> Alias </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Fecha de Creacion </th>
  </tr>

  const tableBody = (el, idx) => {
    return <tr className='h-7' key={`tag-${idx}`}>
        <td> 
          <div className='flex justify-center items-center content-center flex-wrap'>
            <Chip index={idx} label={el.label}/> 
          </div>
        </td>
        <td className='border-l h-full'> 
          <div className='flex justify-center items-center content-center flex-wrap'>
            <Chip index={idx} label={el.alias}/>
          </div>
        </td>
        <td className='border-l h-full'> {getDate(el.createDate)} </td>
    </tr>
  }

  return (
    <ConfigurationTemplate CreateModal={CreateTagModal}  tableHead={tableHead} tableBody={tableBody} get={getTags}
      pieTitle={"Gastos por Etiqueta"} linesTitle={"Historial por Etiquetas"} groupBy={"tags"} 
      title={"Etiquetas"} createTitle={"Nueva Etiqueta"}/>
  )
}