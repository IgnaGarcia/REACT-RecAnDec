import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Modal } from '../../../components/Modal'
import { updateLimit } from '../../../api/LimitsService'
import { useForm } from '../../../hooks/useForm'

export const EditLimitModal = ({ toggleOpen, limit }) => {
  console.log(limit)
  const { user } = useContext(UserContext)
  const { categories } = useContext(ConfigContext)
  const { formState, onInputChange } = useForm({
    amount: limit.amount
  })
  const [formError, setError] = useState(null)
  const response = useLazyFetch()

  const changeLimit = () => {
    if(!formState.amount){
        setError("El Monto no puede estar vacio")
        return
    } else if(formState.amount < 0){
        setError("El Monto no puede ser negativo")
        return
    }
    response.run(updateLimit(user, {_id: limit._id, amount: formState.amount}))
  }

  useEffect(() => {
    if(!response.loading && (response.error || response.body)){
        if (response.error) {
            alert("Error al Enviar");
        } else {
            alert("Limite Actualizado!");
            toggleOpen(false)
        }
    }
  }, [response.loading])

  return (
    <Modal onPost={changeLimit} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Editar Limite </h2>
        
        <div>
            <div className='mb-3 flex items-center justify-center'>
                <span className='mr-6'>Categoria:</span>
                <input className='input bg-back-100 border-back-400' value={ limit.category.label } disabled/>
            </div>
            <div className='mb-8'>
                <label htmlFor="amount" className='mr-6'>Monto:</label>
                <input type="number" placeholder="Monto" name="amount" id="amount" className='input'
                    value={formState.amount} onChange={onInputChange}/>
                    {formError? 
                        <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
                    : ""}
            </div>
        </div>
    </Modal>       
  )
}
