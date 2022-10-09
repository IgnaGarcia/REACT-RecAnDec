import { useState, useEffect } from 'react'

export const useSelect = (filterList = [], cb, ...props) => {
    const [selected, setSelected] = useState(filterList)
    const [options, setOptions] = useState(cb(...props, selected))

    const onSelectChange = (items) => {
        setSelected(items)
    }

    useEffect(() => {
        setOptions(cb(...props, selected))
    }, [selected])
  
    return {
        selected, 
        options,
        onSelectChange
    }
}
