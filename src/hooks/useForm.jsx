import { useState } from 'react'

export const useForm = (form = {}) => {
    const [formState, setFormState] = useState(form)

    const onInputChange = ({ target }) => {
        const { name, value, type, checked } = target
        formState[name] = type === "checkbox" ? checked : value
        setFormState({...formState, [name]: formState[name]})
    }

    const reset = () => {
        setFormState(form)
    }
  
    return {
        ...formState,
        formState,
        onInputChange, 
        reset
    }
}
