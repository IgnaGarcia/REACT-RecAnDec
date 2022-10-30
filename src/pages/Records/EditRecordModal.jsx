import React, { useContext, useEffect } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserContext } from '../../contexts/UserContext'
import { Chip } from '../../components/Chip'
import Select from 'react-select'
import { useSimpleSelect } from '../../hooks/useSimpleSelect'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { putRecord } from '../../api/RecordService'
import { Modal } from '../../components/Modal'

export const EditRecordModal = ({ record, toggleOpen }) => {
  const { user } = useContext(UserContext)
  const { categories, tags, wallets, getCategorie, getTag, getWallet } = useContext(ConfigContext)
  const recordResponse = useLazyFetch()

  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  const getLabel= (id) => {
    let index  = getCategorie(id)
    return index === -1 ? null : { index: index, label: categories.data[index].label } 
  }

  const getWalletSelected= (id) => {
    let index  = getWallet(id)
    if (index === -1) return null
    let selected = wallets.data[index]
    return {value: selected._id, label: selected.label }
  }

  const getTagsSelected= (id) => {
    let index = null
    return id && id.length > 0 ?
            id.map(tagId => {
                index = getTag(tagId) 
                if (index === -1) return null
                let selected = tags.data[index]
                return {value: selected._id, label: selected.label }
            })
            : null
  }

  const arrToInput = (arr) => {
    return arr.data.map(el => {
        return {value: el._id, label: el.label}
    })
  }

  const categorie = getLabel(record.category)
  const tagList = getTagsSelected(record.tags)
  const wallet = getWalletSelected(record.wallet)
  
  const tagSelect = useSimpleSelect(tagList)
  const walletSelect = useSimpleSelect(wallet)

  const saveRecord = () => {
    record.wallet = walletSelect.selected ? walletSelect.selected.value : null
    record.tags = (tagSelect.selected && tagSelect.selected.length) ? tagSelect.selected.map(el => el.value) : null
    recordResponse.run(putRecord(user, record))
  }

  useEffect(() => {
    if(!recordResponse.loading && (recordResponse.error || recordResponse.body)){
        if (recordResponse.error) {
            alert("Error al Enviar");
        } else if (recordResponse.body) {
            alert("Resgistro Actualizado!");
            toggleOpen(false)
        }
    }
}, [recordResponse.loading])

  return (
    <Modal onPost={saveRecord} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Editar Registro </h2>
        <div className='w-3/5 m-auto'>
          <div className='mb-3 flex items-center justify-center'> 
            <span className='mr-6'>Fecha:</span>
            <input className='input flex-1' value={getDate(record.date)} disabled/>
          </div>
          <div className='mb-3 flex items-center justify-center'> 
            <span className='mr-6'>Monto:</span>
            <input className='input flex-1' value={`$${ record.amount }`} disabled/>
          </div>
          <div className='mb-3 flex items-center justify-center'>
            <span className='mr-6'>Categoria:</span>
            <input className='input flex-1' value={ categorie? categorie.label : "" }/>
          </div>

          <div className='mb-3 flex items-center justify-center'>
            <span className='mr-6'>Etiquetas:</span>
            <span className='flex-1'>
              <Select options={arrToInput(tags)} value={tagSelect.selected} isMulti isSearchable 
                  onChange={tagSelect.onSelectChange} hideSelectedOptions={false} />
            </span>
          </div>
          <div className='mb-8 flex items-center justify-center'>
            <span className='mr-6'>Billeteras:</span>
            <span className='flex-1'>
              <Select options={arrToInput(wallets)} value={walletSelect.selected} isSearchable 
                  onChange={walletSelect.onSelectChange} hideSelectedOptions={false} />
            </span>
          </div>
        </div>
    </Modal>       
  )
}
