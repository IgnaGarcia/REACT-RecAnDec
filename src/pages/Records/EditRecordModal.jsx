import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { UserContext } from '../../contexts/UserContext'
import { Chip } from '../../components/Chip'
import Select from 'react-select'

export const EditRecordModal = ({ record, toggleOpen }) => {
  const { user } = useContext(UserContext)
  const { categories, tags, wallets, getCategorie, getTag, getWallet } = useContext(ConfigContext)

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
    return index === -1 ? null : wallets.data[index] 
  }

  const getTagsSelected= (id) => {
    let index = null
    return id && id.length > 0 ?
            id.map(tagId => {
                index = getTag(tagId) 
                return index === -1 ? null : tags.data[index]
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

  const saveRecord = () => {
    toggleOpen(false)
  }

  const onSelectChange = (items) => {
    console.log(items)
  }

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
                <Select options={arrToInput(tags)} value={tagList? tagList : null} isMulti isSearchable 
                    onChange={onSelectChange} hideSelectedOptions={false} />
            </div>
            <div className='flex justify-center items-center content-center flex-wrap mb-3'>
                Billeteras: 
                <Select options={arrToInput(wallets)} value={wallet? wallet : null} isSearchable 
                    onChange={onSelectChange} hideSelectedOptions={false} />
            </div>

            <div className='flex w-full justify-evenly'>
                <button className="btn" onClick={saveRecord}> Guardar </button>
                <button className="btn bg-red-500" onClick={() => toggleOpen(false)}> Cancelar </button>
            </div>
        </div>
    </div>       
  )
}
