import React, { useState, useContext} from 'react'
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
            <button className='btn-mini' onClick={() => setEditOpen(true)}> Editar </button>
            <button className='btn-mini bg-red-600' onClick={() => onDeleteCommand(el)}> Borrar </button>
        </td>
        { editOpen? <EditCommandModal toggleOpen={setEditOpen} command={el}/> : "" }
    </tr>
}