import { useState } from 'react'

export const useSimpleSelect = (filterList = []) => {
    const [selected, setSelected] = useState(filterList)

    const onSelectChange = (items) => {
        setSelected(items)
    }
  
    return {
        selected,
        onSelectChange
    }
}
