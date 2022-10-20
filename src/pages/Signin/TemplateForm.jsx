import React from 'react'

export const TemplateForm = ({title, form, onSubmit}) => {

  return (
    <div className='w-1/3 py-12 px-5 bg-back-700'>
        <h2 className='title'>{title}</h2>
        {form}
        <button className="btn" onClick={onSubmit}> Guardar </button>
    </div>
  )
}
