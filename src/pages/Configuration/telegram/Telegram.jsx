import React, { useState, useContext} from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { getCommand, deleteCommand } from '../../../api/CommandsService'
import { Chip } from '../../../components/Chip'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { CommandModal } from './CommandModal'
import { EditCommandModal } from './EditCommandModal'

export const Telegram = () => {
  const { user } = useContext(UserContext)
  const deleteResponse = useLazyFetch()
  const [editOpen, setEditOpen] = useState(false)

  const onDeleteCommand = (el) => {
    deleteResponse.run(deleteCommand(user, el._id))
  }

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Para Egresos </th>
    <th className='border-l border-back-500'> Categoria </th>
    <th className='border-l border-back-500'> Tags </th>
    <th className='border-l border-back-500'> Billetera </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Acciones </th>
  </tr>

  const tableBody = (el, idx) => {
    return <tr className='h-7' key={`command-${idx}`}>
        <td> {el.expense? "Si" : "No"} </td>
        <td className='border-l h-full'> 
          {el.category?
            <div className='flex justify-center items-center content-center flex-wrap'>
                <Chip index={idx} label={el.category.label}/> 
            </div>  
            : "" }
        </td>
        <td className='border-l h-full'> 
          {el.tags?
            <div className='flex justify-center items-center content-center flex-wrap'>
                {el.tags.map(el => el? <Chip index={el.index} label={el.label} key={`tag-chip-${el.index}-${el.label}`}/> : "")}
            </div> 
          : "" }
        </td>
        <td className='border-l h-full'> 
          {el.wallet?
            <div className='flex justify-center items-center content-center flex-wrap'>
                <Chip index={idx} label={el.wallet.label}/>
            </div> 
          : "" }
        </td>
        <td className='border-l h-full'> 
            <button className='btn' onClick={() => onDeleteCommand(el)}> Borrar </button>
            <button className='btn' onClick={() => setEditOpen(true)}> Editar </button>
        </td>
        { editOpen? <EditCommandModal toggleOpen={setEditOpen} command={el}/> : "" }
    </tr>
  }

  return (
    <>
      {user.telegramId[0] === '_'?
       <div className='w-10/12 px-4 pt-12 mx-auto flex justify-evenly items-center text-lg'> 
          Codigo de Sincronizacion: 
          <span className='bg-back-200/75 rounded-lg py-4 px-12'>{user.telegramId}</span>
       </div> 
       : ""
      }
      <ConfigurationTemplate CreateModal={CommandModal}  tableHead={tableHead} tableBody={tableBody} get={getCommand}
        title={"Comandos"} createTitle={"Nuevo Comando"}/>
    </>
  )
}