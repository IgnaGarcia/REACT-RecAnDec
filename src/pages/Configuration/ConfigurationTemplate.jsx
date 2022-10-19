import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { PiePlot } from '../../components/PiePlot' 
import { LinesPlot } from '../../components/LinesPlot'
import { BarsPlot } from '../../components/BarsPlot'

export const ConfigurationTemplate = ({ CreateModal, get, tableHead, tableBody, pieTitle, linesTitle, barTitle, title, createTitle, groupBy }) => {
  const { user } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [isNew, setNew] = useState(true)
  const { run, body, loading } = useLazyFetch()

  let gettedList = () => body.data.map(el => {
      return { value: el._id, label: el.label }
  })

  useEffect(() => {
    if(isNew) {
      run(get(user))
      setNew(false)
    }
  }, [isNew]) 

  return (
    <div className="grid grid-cols-1 gap-4 w-10/12 px-4 py-12 mx-auto">
        <div className='flex justify-between items-center'>
          <h2 className='title mb-6'> { title } </h2>
          <button className='btn text-sm' onClick={() => setModalOpen(true)}> { createTitle } </button>
        </div>
        { loading? "Cargando..." : 
          <>
          <div>
            <div className='table-card'>
              { body && body.data && body.data.length ?
              <table className='table table-auto rounded-full min-w-full'>
                <thead className='text-back-300 bg-back-600 h-7 rounded-t-full'>
                  { tableHead }
                </thead>
                <tbody>
                   {body.data.map((el, idx) => tableBody(el, idx))} 
                </tbody>
              </table>
              : <div className='mx-auto py-4 w-full'> No hay elementos </div>}
            </div>
          </div>
            { body && body.data && body.data.length ?
            <>
              { pieTitle?
                <PiePlot title={pieTitle} groupBy={groupBy} 
                    filterList={() => gettedList()} /> : ""
              }
              { linesTitle?
                <LinesPlot title={linesTitle} groupBy={groupBy}  
                    filterList={() => gettedList()} /> : ""
              }
              { barTitle?
                <BarsPlot title={barTitle} /> : ""
              }
            </>
            : "" }
          </>
        }
        { modalOpen? <CreateModal toggleOpen={setModalOpen} isNew={setNew}/> : "" }
    </div>
  )
}