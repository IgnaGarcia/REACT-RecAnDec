import React, { useState, useContext, useEffect } from 'react'
import { login } from '../../api/UserService';
import { UserContext } from '../../contexts/UserContext';
import { useForm } from '../../hooks/useForm';
import { useLazyFetch } from '../../hooks/useLazyFetch';
import { TemplateForm } from './TemplateForm';

export const LogIn = () => {
  const { saveUser } = useContext(UserContext)
  const lazyFetch = useLazyFetch()
  const {formState, onInputChange} = useForm({
    email: "",
    password: ""
  })
  const [formError, setError] = useState(null)

  const form = <div className='w-2/3'>
    <div className='mb-6 flex flex-col'>
        <label htmlFor="email"> Correo electronico </label>
        <input name="email" value={formState.email} onChange={onInputChange} className="text-back-700"/>
    </div>
    <div className='flex flex-col'>
        <label htmlFor="password"> Constraseña </label>
        <input type="password" name="password" value={formState.password} onChange={onInputChange} className="text-back-700"/>
        {formError? 
            <div className='mt-3 text-xs text-center text-red-300'> {formError} </div> 
        : ""}
    </div>
  </div>

    useEffect(() => {
        if(!lazyFetch.loading && (lazyFetch.error || lazyFetch.body)){
            if (lazyFetch.error) {
                alert("Error al Enviar");
            } else if (lazyFetch.body.code === 403 || lazyFetch.body.code === 500) {
                setError("Usuario o contraseña invalidos")
            } else {
                console.log(lazyFetch.body)
                saveUser(lazyFetch.body.data, lazyFetch.body.token)
            }
        }
    }, [lazyFetch.loading])

    const onSubmit = () => {
        if(!formState.email || formState.email.length < 7) {
            setError("Debe ingresar un correo valido")
            return
        }
        if(!formState.password || formState.password.length < 3) {
            setError("Debe ingresar una contraseña valido")
            return
        }
        lazyFetch.run(login(formState))
    }

  return (
    <TemplateForm title={"Ingresar"} onSubmit={onSubmit} form={form} />
  )
}
