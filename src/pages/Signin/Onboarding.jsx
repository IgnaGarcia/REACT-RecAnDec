import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { useForm } from '../../hooks/useForm';
import { useLazyFetch } from '../../hooks/useLazyFetch';

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

  const handleLogin = (event) => {
    event.preventDefault()
    let wallet = formState.wallet !== "" ? formState.wallet : null
    let tags = formState.tags !== "" ? formState.tags : null

    let req = {
        "amount": formState.amount,
        "category": formState.category,
        "isOut": !formState.isIn,
        wallet,
        tags
    }
    recordResponse.run(postRecord(user, req))
}

const handleSignin = (event) => {
  event.preventDefault()
  let wallet = formState.wallet !== "" ? formState.wallet : null
  let tags = formState.tags !== "" ? formState.tags : null

  let req = {
      "amount": formState.amount,
      "category": formState.category,
      "isOut": !formState.isIn,
      wallet,
      tags
  }
  recordResponse.run(postRecord(user, req))
}

  return (
    <div className='w-full h-full flex justify-between'>
       <div>
          Login

       </div>
       <div>
          Signin
       </div>
    </div>
  )
}
