import React, { useState, useContext } from 'react'
import { getRecords } from '../../api/RecordService'
import { useFetch } from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { PageCarousel } from '../../components/PageCarousel'

export const RecordsList = ({ isOut }) => {
  const { user } = useContext(UserContext)
  const [page, setPage] = useState(1)
  const { body, loading } = useFetch(getRecords(user, page, isOut))

  const getDate = (dateStr) => {
    let date = new Date(dateStr)
    return `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  return (
    <div className="flex flex-col w-10/12 mx-auto">
        { isOut? "Egresos" : "Ingresos" }
        { loading? "Cargando..." : 
          <div>
            {console.log(body)}
            <div className='table-card'>
              <table className='table table-auto w-full'>
                <thead className='text-back-300 bg-back-600'>
                  <th> Fecha </th>
                  <th> Monto </th>
                  <th> Categoria </th>
                  <th> Etiquetas </th>
                  <th> Billetera </th>
                  <th> Acciones </th>
                </thead>
                {
                  body.data.map(el => 
                    <tr className='border-b border-back-200'>
                      <td>{getDate(el.date)}</td>
                      <td>${el.amount}</td>
                      <td>{el.category}</td>
                      <td>{el.tags}</td>
                      <td>{el.wallet}</td>
                      <td>Editar</td>
                    </tr>
                  )
                }
              </table>
            </div>
            <PageCarousel page={page} onPageChange={setPage} minPage={1} maxPage={body.paging.last} />
          </div>
        }

    </div>
  )
}
