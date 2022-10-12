import React, { useState, useContext } from 'react'
import { getRecords } from '../../api/RecordService'
import { useFetch } from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { PageCarousel } from '../../components/PageCarousel'
import { RecordRow } from './RecordRow'

export const RecordsList = ({ isOut, pageN=1 }) => {
  const { user } = useContext(UserContext)
  const [page, setPage] = useState(pageN)
  const { body, loading } = useFetch(getRecords(user, page, isOut))

  return (
    <div className="flex flex-col w-10/12 mx-auto">
        <h2 className='title my-6'> { isOut? "Egresos" : "Ingresos" }</h2>
        
        { loading? "Cargando..." : 
          <div>
            <div className='table-card'>
              <table className='table table-auto rounded-full min-w-full'>
                <thead className='text-back-300 bg-back-600 h-7 rounded-t-full'>
                  <tr>
                    <th className='rounded-tl-xl'> Fecha </th>
                    <th className='border-l border-back-500'> Monto </th>
                    <th className='border-l border-back-500'> Categoria </th>
                    <th className='border-l border-back-500'> Etiquetas </th>
                    <th className='border-l border-back-500'> Billetera </th>
                    <th className="border-l border-back-500 rounded-tr-xl"> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  { body.data.map(el => <RecordRow record={el} key={el._id}/>) }
                </tbody>
              </table>
            </div>
            <PageCarousel page={page} onPageChange={setPage} minPage={1} maxPage={body.paging.last} />
          </div>
        }

    </div>
  )
}
