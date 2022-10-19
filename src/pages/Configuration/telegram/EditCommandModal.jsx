import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { useSimpleSelect } from '../../../hooks/useSimpleSelect'
import { Modal } from '../../../components/Modal'
import { postCommand } from '../../../api/CommandsService'
import { useForm } from '../../../hooks/useForm'
import Select from 'react-select'

export const EditCommandModal = ({ toggleOpen, command }) => {
    console.log(command)
  const { user } = useContext(UserContext)
  const { categories, tags, wallets } = useContext(ConfigContext)
  const { formState, onInputChange } = useForm({
    expense: command.expense
  })
  let categoriesOut = categories.data.filter(el => el.isOut).map(el => {return { value: el._id, label: el.label }})
  let categoriesIn = categories.data.filter(el => !el.isOut).map(el => {return { value: el._id, label: el.label }})
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const categorySelect = useSimpleSelect(command && command.category? {value: command.category._id, label: command.category.label} : null)
  const tagSelect = useSimpleSelect(command && command.tags? command.tags.map(el => { return {value: el._id, label: el.label}}) : null)
  const walletSelect = useSimpleSelect(command && command.wallet? {value: command.wallet._id, label: command.wallet.label} : null)
  const [formError, setError] = useState(null)
  const response = useLazyFetch()

  let gettedList = (list) => list.data.map(el => {
        return { value: el._id, label: el.label }
  })

  const saveCommand = () => {
    if(!categorySelect.selected || categorySelect.selected.length === 0) {
        setError("Debe seleccionar una categoria")
        return
    }
    response.run(postCommand(user, {
        expense: formState.expense, 
        category: categorySelect.selected.value,
        tags: tagSelect.selected? tagSelect.selected.map(el => el.value) : null,
        wallet: walletSelect.selected? walletSelect.selected.value : null
    }))
  }

  useEffect(() => {
    if(!response.loading && (response.error || response.body)){
        if (response.error) {
            alert("Error al Enviar");
        } else {
            alert("Comando Editado!");
            toggleOpen(false)
        }
    }
  }, [response.loading])

  useEffect(() => {
    formState.expense? setCategoriesToShow(categoriesOut) : setCategoriesToShow(categoriesIn)
  }, [formState.expense])

  return (
    <Modal onPost={saveCommand} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Editar Comando </h2>
        
        <div>
            <div className='mb-3'>
                <Select options={categoriesToShow} value={categorySelect.selected} isSearchable 
                        onChange={categorySelect.onSelectChange} hideSelectedOptions={false} />
            </div>
            <div className='mb-3'>
                <Select options={gettedList(tags)} value={tagSelect.selected} isSearchable isMulti
                        onChange={tagSelect.onSelectChange} hideSelectedOptions={false} />
            </div>
            <div className='mb-3'>
                <Select options={gettedList(wallets)} value={walletSelect.selected} isSearchable 
                        onChange={walletSelect.onSelectChange} hideSelectedOptions={false} />
            </div>
            <div className='mb-8'>
                <input type="checkbox" name="expense" id="expense"
                    checked={formState.expense} onChange={onInputChange}/>
                <label htmlFor="expense" className='ml-6'>Para Egresos</label>
                    {formError? 
                        <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
                    : ""}
            </div>
        </div>
    </Modal>       
  )
}
