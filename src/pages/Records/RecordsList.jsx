import React from 'react'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

export const RecordsList = ({ isOut }) => {
  cont [page, setPage] = useState(1)
  const { body, loading } = useFetch()

  return (
    <>
        { isOut? "Egresos" : "Ingresos" }
    </>
  )
}
