import React, { useContext, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { Chip } from '../../components/Chip'
import { EditRecordModal } from './EditRecordModal'

export const RecordRow = ({ record }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { categories, tags, wallets, getCategorie, getTag, getWallet } = useContext(ConfigContext)

  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  const getLabel= (type, id) => {
    let index = null
    if(type === 0) {
        index = getCategorie(id)
        return index === -1 ? null : { index: index, label: categories.data[index].label } 
    }
    if(type === 1) {
        return id && id.length > 0 ?
            id.map(tagId => {
                index = getTag(tagId) 
                return index === -1 ? null : { index: index, label: tags.data[index].label }
            })
            : null
    }
    if(type === 2) {
        index = getWallet(id)
        return index === -1 ? null : { index: index, label: wallets.data[index].label }
    }
  }

  const categorie = getLabel(0, record.category)
  const tagList = getLabel(1, record.tags)
  const wallet = getLabel(2, record.wallet)
  
  return (
    <tr className='h-7'>
        <td>{getDate(record.date)}</td>
        <td className='border-l'>${ record.amount }</td>

        <td className='border-l h-full'>
            <div className='flex justify-center items-center content-center flex-wrap'>
                { categorie? 
                    <Chip index={categorie.index} label={categorie.label} /> 
                : "" }
            </div>
        </td>

        <td className='border-l h-full'> 
            <div className='flex justify-center items-center content-center flex-wrap'>
                { tagList? 
                    tagList.map(el => el?
                        <Chip index={el.index} label={el.label} key={`tag-chip-${el.index}-${el.label}`}/> : ""
                    ) 
                : "" }
            </div>
        </td>

        <td className='border-l h-full'>
            <div className='flex justify-center items-center content-center flex-wrap'>
                { wallet? 
                    <Chip index={wallet.index} label={wallet.label} />
                : "" }
            </div>
        </td>

        <td className='border-l'>
            <button onClick={() => setModalOpen(true)} className='btn-mini'> Editar </button>
        </td>

        { modalOpen? <EditRecordModal record={record} toggleOpen={setModalOpen} /> : "" }
    </tr>        
  )
}
