import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Modal } from '../../../components/Modal'
import { postCategorie } from '../../../api/CategoriesService'
import { useForm } from '../../../hooks/useForm'

export const LimitModal = ({ toggleOpen, isNew }) => {
  const { user } = useContext(UserContext)
  const { categories, saveCategories } = useContext(ConfigContext)
  const { formState, onInputChange } = useForm({
    label: null,
    alias: null,
    isOut: true
  })
  const [formError, setError] = useState(null)
  const response = useLazyFetch()

  const saveCategorie = () => {
    if(!formState.label) {
        setError("El Nombre no puede estar vacio")
        return
    }
    if(!formState.alias){
        setError("El Alias no puede estar vacio")
        return
    }
    response.run(postCategorie(user, formState))
  }

  useEffect(() => {
    if(!response.loading && (response.error || response.body)){
        if (response.error) {
            alert("Error al Enviar");
        } else if (response.body.code === 11000) {
            setError("Nombre o Alias ya existente entre tus categorias")
        } else {
            alert("Billetera Creada!");
            categories.data.push(response.body.data)
            saveCategories(categories.data)
            isNew(true)
            toggleOpen(false)
        }
    }
}, [response.loading])

  return (
    <Modal onPost={saveCategorie} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Crear Categoria </h2>
        
        <div>
            <div className='mb-3'>
                <label htmlFor="label" className='mr-6'>Nombre:</label>
                <input placeholder="Nombre" name="label" id="label" 
                    value={formState.label} onChange={onInputChange}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="alias" className='mr-6'>Alias:</label>
                <input placeholder="Alias" name="alias" id="alias" 
                    value={formState.alias} onChange={onInputChange}/>
            </div>
            <div className='mb-8'>
                <input type="checkbox" name="isOut" id="isOut"
                    checked={formState.isOut} onChange={onInputChange}/>
                <label htmlFor="isOut" className='ml-6'>Para Egresos</label>
                {formError? 
                    <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
                : ""}
            </div>
        </div>
    </Modal>       
  )
}
