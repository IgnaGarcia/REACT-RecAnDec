import React from 'react'

export const TemplateForm = ({title, form, onSubmit}) => {

  return (
    <div className='w-1/3 py-12 px-5 bg-back-700 flex flex-col items-center rounded-3xl text-back-200'>
        <h2 className='title mb-12'>{title}</h2>
        {form}
        <button className="btn-secondary mt-12" onClick={onSubmit}> {title} </button>
    </div>
  )
}
