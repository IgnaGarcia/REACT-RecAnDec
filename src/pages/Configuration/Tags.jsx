import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { getTags } from '../../api/TagsService'
import { Chip } from '../../components/Chip'
import { useFetch } from '../../hooks/useFetch'

export const Tags = () => {
  const { user } = useContext(UserContext)
  const { body, loading } = useFetch(getTags(user))

  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  return (
    <div className="flex flex-col w-10/12 mx-auto">
        <div className='flex justify-between items-center'>
          <h2 className='title my-6'> Etiquetas </h2>
          <h2 className='btn text-sm'> Nueva Etiqueta </h2>
        </div>
        
        { loading? "Cargando..." : 
          <div>
            <div className='table-card'>
              <table className='table table-auto rounded-full min-w-full'>
                <thead className='text-back-300 bg-back-600 h-7 rounded-t-full'>
                  <tr>
                    <th className='rounded-tl-xl'> Nombre </th>
                    <th className='border-l border-back-500'> Alias </th>
                    <th className='border-l border-back-500 rounded-tr-xl'> Fecha de Creacion </th>
                  </tr>
                </thead>
                <tbody>
                  { body.data.map((el, idx) => 
                    <tr className='h-7'>
                        <td> 
                          <div className='flex justify-center items-center content-center flex-wrap'>
                            <Chip index={idx} label={el.label}/> 
                          </div>
                        </td>
                        <td className='border-l h-full'> 
                          <div className='flex justify-center items-center content-center flex-wrap'>
                            <Chip index={idx} label={el.alias}/>
                          </div>
                        </td>
                        <td className='border-l h-full'> {getDate(el.createDate)} </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }

    </div>
  )
}