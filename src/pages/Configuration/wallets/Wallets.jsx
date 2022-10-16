import React from 'react'
import { getWallets } from '../../../api/WalletService'
import { Chip } from '../../../components/Chip'
import { CreateWalletModal } from './CreateWalletModal'
import { ConfigurationTemplate } from '../ConfigurationTemplate'

export const Wallets = () => {
  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Nombre </th>
    <th className='border-l border-back-500'> Alias </th>
    <th className='border-l border-back-500'> Dinero Actual </th>
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
        <td className='border-l h-full'> {el.acum} </td>
        <td className='border-l h-full'> {getDate(el.createDate)} </td>
    </tr>
  }

  return (
    <ConfigurationTemplate CreateModal={CreateWalletModal}  tableHead={tableHead} tableBody={tableBody} get={getWallets}
      pieTitle={"Gastos por Billetera"} linesTitle={"Historial por Billetera"} groupBy={"wallet"} 
      title={"Billeteras"} createTitle={"Nueva Billetera"}/>
  )
}