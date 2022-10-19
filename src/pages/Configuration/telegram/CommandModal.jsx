import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { useSimpleSelect } from '../../../hooks/useSimpleSelect'
import { Modal } from '../../../components/Modal'
import { postCommand } from '../../../api/CommandsService'
import { useForm } from '../../../hooks/useForm'
import Select from 'react-select'

export const CommandModal = ({ toggleOpen, isNew, command }) => {
  const { user } = useContext(UserContext)
  const { categories, tags, wallets } = useContext(ConfigContext)
  const categorySelect = useSimpleSelect()
  const tagSelect = useSimpleSelect()
  const walletSelect = useSimpleSelect()
  const { formState, onInputChange } = useForm({
    expense: true
  })
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
        tags: tagSelect.selected.map(el => el.value),
        wallet: walletSelect.selected.value
    }))
  }

  useEffect(() => {
    if(!response.loading && (response.error || response.body)){
        if (response.error) {
            alert("Error al Enviar");
        } else {
            alert("Comando Actualizado!");
            isNew(true)
            toggleOpen(false)
        }
    }
}, [response.loading])

  return (
    <Modal onPost={saveCommand} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Editar Comando </h2>
        
        <div>
            <div className='mb-3'>
                <Select options={gettedList(categories)} value={categorySelect.selected} isSearchable 
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
