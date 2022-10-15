import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Modal } from '../../../components/Modal'
import { postTag } from '../../../api/TagsService'
import { useForm } from '../../../hooks/useForm'

export const CreateTagModal = ({ toggleOpen, isNew }) => {
  const { user } = useContext(UserContext)
  const { tags, saveTags } = useContext(ConfigContext)
  const { formState, onInputChange } = useForm({
    label: "",
    alias: ""
  })
  const [formError, setError] = useState(null)
  const tagResponse = useLazyFetch()

  const saveTag = () => {
    tagResponse.run(postTag(user, formState))
  }

  useEffect(() => {
    if(!tagResponse.loading && (tagResponse.error || tagResponse.body)){
        if (tagResponse.error) {
            alert("Error al Enviar");
        } else if (tagResponse.body.code === 11000) {
            setError("Nombre o Alias ya existente entre tus etiquetas")
        } else {
            alert("Etiqueta Creada!");
            tags.data.push(tagResponse.body)
            saveTags(tags.data)
            isNew(true)
            toggleOpen(false)
        }
    }
}, [tagResponse.loading])

  return (
    <Modal onPost={saveTag} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Crear Etiqueta </h2>
        
        <div className='w-1/2 m-auto text-right'>
            <div className='mb-3'>
                <label htmlFor="label" className='mr-6'>Nombre:</label>
                <input placeholder="Nombre" name="label" id="label" 
                    value={formState.label} onChange={onInputChange}/>
            </div>
            <div className='mb-8'>
                <label htmlFor="alias" className='mr-6'>Alias:</label>
                <input placeholder="Alias" name="alias" id="alias" 
                    value={formState.alias} onChange={onInputChange}/>
                {formError? 
                    <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
                : ""}
            </div>
        </div>
    </Modal>       
  )
}
