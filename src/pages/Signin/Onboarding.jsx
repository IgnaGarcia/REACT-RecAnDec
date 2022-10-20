import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { useForm } from '../../hooks/useForm';
import { useLazyFetch } from '../../hooks/useLazyFetch';
import { LogIn } from './LogIn';

export const Onboarding = () => {
  const { user, saveUser } = useContext(UserContext)
  const response = useLazyFetch()
  const loginForm = useForm({
    email: "",
    password: ""
  })
  const signinForm = useForm({
    email: "",
    name: "",
    password: ""
  })

  return (
    <div className='w-full h-full flex justify-between'>
       <LogIn/>
    </div>
  )
}
