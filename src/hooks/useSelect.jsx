import { useState, useEffect } from 'react'

export const useSelect = (filterList = [], cb, ...props) => {
    const [selected, setSelected] = useState(filterList)
    const [period, setPeriod] = useState(new Date())
    const [options, setOptions] = useState(cb(...props, selected, period))

    const onSelectChange = (items) => {
        setSelected(items)
    }

    const onPeriodChange = (period) => {
        setPeriod(period)
    }

    useEffect(() => {
        setOptions(cb(...props, selected, period))
    }, [selected, period])
  
    return {
        selected,
        period, 
        options,
        onSelectChange,
        onPeriodChange
    }
}
