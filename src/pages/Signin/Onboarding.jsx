import React from 'react'
import { LogIn } from './LogIn';
import { SignIn } from './SignIn';

export const Onboarding = () => {

  return (
    <div className='w-screen h-screen flex justify-evenly content-center flex-wrap bg-back-100'>
       <LogIn/>
       <SignIn/>
    </div>
  )
}
