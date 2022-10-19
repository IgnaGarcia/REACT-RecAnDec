import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { getTags } from '../../../api/TagsService'
import { Chip } from '../../../components/Chip'
import { useLazyFetch } from '../../../hooks/useLazyFetch'
import { CreateTagModal } from './CreateTagModal'
import { PiePlot } from '../../../components/PiePlot' 
import { LinesPlot } from '../../../components/LinesPlot'

export const Tags = () => {
  const { user } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [newTag, setNewTag] = useState(true)
  const { run, body, loading } = useLazyFetch()

  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }
  let tagsList = () => body.data.map(el => {
      return { value: el._id, label: el.label }
  })

  useEffect(() => {
    if(newTag) {
      run(getTags(user))
      setNewTag(false)
    }
  }, [newTag]) 

  return (
    <div className="grid grid-cols-1 gap-4 w-10/12 px-4 py-12 mx-auto">
        <div className='flex justify-between items-center'>
          <h2 className='title mb-6'> Etiquetas </h2>
          <button className='btn text-sm' onClick={() => setModalOpen(true)}> Nueva Etiqueta </button>
        </div>
        { modalOpen? <CreateTagModal toggleOpen={setModalOpen} isNew={setNewTag}/> : "" }
        { loading? "Cargando..." : 
          <>
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
                    <tr className='h-7' key={`tag-${idx}`}>
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
            <PiePlot title="Gastos por Etiqueta" groupBy="tags" 
                filterList={() => tagsList()} />
            <LinesPlot title="Historial por Etiquetas" groupBy="tags" 
                filterList={() => tagsList()} />
          </>
        }
    </div>
  )
}