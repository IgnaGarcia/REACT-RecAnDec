import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { Modal } from '../../../components/Modal'
import { postWallet } from '../../../api/WalletService'
import { useForm } from '../../../hooks/useForm'

export const CreateWalletModal = ({ toggleOpen, isNew }) => {
  const { user } = useContext(UserContext)
  const { wallets, saveWallets } = useContext(ConfigContext)
  const { formState, onInputChange } = useForm({
    label: "",
    alias: "",
    acum: 0
  })
  const [formError, setError] = useState(null)
  const response = useLazyFetch()

  const saveWallet = () => {
    if(!formState.label) {
        setError("El Nombre no puede estar vacio")
        return
    }
    if(!formState.alias){
        setError("El Alias no puede estar vacio")
        return
    }
    response.run(postWallet(user, formState))
  }

  useEffect(() => {
    if(!response.loading && (response.error || response.body)){
        if (response.error) {
            alert("Error al Enviar");
        } else if (response.body.code === 11000) {
            setError("Nombre o Alias ya existente entre tus billeteras")
        } else {
            alert("Billetera Creada!");
            wallets.data.push(response.body.data)
            saveWallets(wallets.data)
            isNew(true)
            toggleOpen(false)
        }
    }
}, [response.loading])

  return (
    <Modal onPost={saveWallet} toggleOpen={toggleOpen}>
        <h2 className='title mb-8'> Crear Billetera </h2>
        
        <div className='w-3/5 m-auto text-right'>
            <div className='mb-3'>
                <label htmlFor="label" className='mr-6'>Nombre:</label>
                <input placeholder="Nombre" name="label" id="label" className='input'
                    value={formState.label} onChange={onInputChange} required/>
            </div>
            <div className='mb-3'>
                <label htmlFor="alias" className='mr-6'>Alias:</label>
                <input placeholder="Alias" name="alias" id="alias" className='input'
                    value={formState.alias} onChange={onInputChange} required/>
            </div>
            <div className='mb-8'>
                <label htmlFor="acum" className='mr-6'>Dinero Actual:</label>
                <input type="number" min={1} placeholder="Dinero" name="acum" id="acum" className='input'
                    value={formState.acum} onChange={onInputChange}/>
                {formError? 
                    <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
                : ""}
            </div>
        </div>
    </Modal>       
  )
}
