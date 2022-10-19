import React from 'react'

export const Modal = ({ children, onPost, toggleOpen }) => {

  return (
    <div className="modal">
        <div className='card flex-1 py-10'>
            {children}
            <div className='flex w-full justify-evenly'>
                <button className="btn" onClick={onPost}> Guardar </button>
                <button className="btn bg-red-500" onClick={() => toggleOpen(false)}> Cancelar </button>
            </div>
        </div>
    </div>       
  )
}
