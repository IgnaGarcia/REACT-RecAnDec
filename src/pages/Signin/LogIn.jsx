import React, { useState, useContext, useEffect } from 'react'
import { login } from '../../api/UserService';
import { UserContext } from '../../contexts/UserContext';
import { useForm } from '../../hooks/useForm';
import { useLazyFetch } from '../../hooks/useLazyFetch';
import { TemplateForm } from './TemplateForm';

export const LogIn = () => {
  const { user, saveUser } = useContext(UserContext)
  const lazyFetch = useLazyFetch()
  const {formState, onInputChange} = useForm({
    email: "",
    password: ""
  })
  const [formError, setError] = useState(null)

  const form = <div>
    <div>
        <label htmlFor="email"> Correo electronico </label>
        <input name="email" id="email" 
            value={formState.email} onChange={onInputChange}/>
    </div>
    <div>
        <label htmlFor="password"> Constraseña </label>
        <input type="password" name="password" id="password" 
            value={formState.password} onChange={onInputChange}/>
        {formError? 
            <div className='mt-2 text-xs text-center text-red-600'> {formError} </div> 
        : ""}
    </div>
  </div>

    useEffect(() => {
        if(!lazyFetch.loading && (lazyFetch.error || lazyFetch.body)){
            if (lazyFetch.error) {
                alert("Error al Enviar");
            } else {
                console.log(lazyFetch.body)
                saveUser(lazyFetch.body.data, lazyFetch.body.token)
            }
        }
    }, [lazyFetch.loading])

    const onSubmit = () => {
        console.log("submit")
        if(!formState.email || formState.email.length < 7) {
            setError("Debe ingresar un correo valido")
            return
        }
        if(!formState.password || formState.password.length < 3) {
            setError("Debe ingresar una contraseña valido")
            return
        }
        console.log(login(formState))
        lazyFetch.run(login(formState))
    }

  return (
    <TemplateForm title={"Ingresar"} onSubmit={onSubmit} form={form} />
  )
}