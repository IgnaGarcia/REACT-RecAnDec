import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { deleteCommand } from '../../../api/CommandsService'
import { Chip } from '../../../components/Chip'
import { EditCommandModal } from './EditCommandModal'

export const TelegramRow = ({el, idx}) => {
    const { user } = useContext(UserContext)
    const deleteResponse = useLazyFetch()
    const [editOpen, setEditOpen] = useState(false)

    const onDeleteCommand = (el) => {
        deleteResponse.run(deleteCommand(user, el._id))
    }

    useEffect(() => {
        if(!deleteResponse.loading && (deleteResponse.error || deleteResponse.body)){
            if (deleteResponse.error) {
                alert("Error al Enviar");
            } else {
                alert("Comando Eliminado!");
            }
        }
      }, [deleteResponse.loading])

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
                {el.tags.map((el, index) => el? <Chip index={index} label={el.label} key={`tag-chip-${index}-${el.label}`}/> : "")}
            </div> 
            : "" }
        </td>
        <td className='border-l h-full'> 
            {el.wallet?
            <div className='flex justify-center items-center content-center flex-wrap'>
                <Chip index={idx+1} label={el.wallet.label}/>
            </div> 
            : "" }
        </td>
        <td className='border-l h-full'> 
            <button className='btn-mini' onClick={() => setEditOpen(true)}> Editar </button>
            <button className='btn-mini bg-red-600' onClick={() => onDeleteCommand(el)}> Borrar </button>
        </td>
        { editOpen? <EditCommandModal toggleOpen={setEditOpen} command={el}/> : "" }
    </tr>
}