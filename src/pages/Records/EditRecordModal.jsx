import React, { useContext, useEffect } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserContext } from '../../contexts/UserContext'
import { Chip } from '../../components/Chip'
import Select from 'react-select'
import { useSimpleSelect } from '../../hooks/useSimpleSelect'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { putRecord } from '../../api/RecordService'

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
    <div className="fixed overflow-x-hidden overflow-y-hidden top-0 left-0 right-0 z-50 
        w-full h-full bg-back-900/50 flex justify-center items-center">
        <div className='card flex-1 py-10'>
            <h2 className='title mb-3'> Editar Registro </h2>
            <div className='mb-3'> Fecha: {getDate(record.date)} </div>
            <div className='mb-3'> Monto: ${ record.amount } </div>
            <div className='flex justify-center items-center content-center flex-wrap mb-3'>
                Categoria: { categorie? 
                    <Chip index={categorie.index} label={categorie.label} /> 
                : "" }
            </div>

            <div className='flex justify-center items-center content-center flex-wrap mb-3'>
                Etiquetas: 
                <Select options={arrToInput(tags)} value={tagSelect.selected} isMulti isSearchable 
                    onChange={tagSelect.onSelectChange} hideSelectedOptions={false} />
            </div>
            <div className='flex justify-center items-center content-center flex-wrap mb-3'>
                Billeteras: 
                <Select options={arrToInput(wallets)} value={walletSelect.selected} isSearchable 
                    onChange={walletSelect.onSelectChange} hideSelectedOptions={false} />
            </div>

            <div className='flex w-full justify-evenly'>
                <button className="btn" onClick={saveRecord}> Guardar </button>
                <button className="btn bg-red-500" onClick={() => toggleOpen(false)}> Cancelar </button>
            </div>
        </div>
    </div>       
  )
}
