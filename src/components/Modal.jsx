import React from 'react'

export const Modal = ({ children, onPost, toggleOpen }) => {

  return (
    <div className="modal">
        <div className='card py-10 w-1/2'>
            {children}
            <div className='flex w-full justify-evenly'>
                <button className="btn" onClick={onPost}> Guardar </button>
                <button className="btn bg-red-500" onClick={() => toggleOpen(false)}> Cancelar </button>
            </div>
        </div>
    </div>       
  )
}
