import React from 'react'
import { Chip } from '../../../components/Chip'
import { CreateCategorieModal } from './CreateCategorieModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { getCategories } from '../../../api/CategoriesService'

export const Categories = () => {
  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Nombre </th>
    <th className='border-l border-back-500'> Alias </th>
    <th className='border-l border-back-500'> Para Ingresos </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Fecha de Creacion </th>
  </tr>

  const tableBody = (el, idx) => {
    return <tr className='h-7' key={`category-${idx}`}>
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
        <td className='border-l h-full'> { el.isOut? "Si" : "No" } </td>
        <td className='border-l h-full'> {getDate(el.createDate)} </td>
    </tr>
  }

  return (
    <ConfigurationTemplate CreateModal={CreateCategorieModal}  tableHead={tableHead} tableBody={tableBody} get={getCategories}
      pieTitle={"Gastos por Categoria"} linesTitle={"Historial por Categoria"} groupBy={"category"} 
      title={"Categorias"} createTitle={"Nueva Categoria"}/>
  )
}