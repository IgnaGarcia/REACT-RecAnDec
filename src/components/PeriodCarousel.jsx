import React from 'react'

export const PeriodCarousel = ({ period, onPeriodChange, minPeriod }) => {
    const maxPeriod = new Date()
    const minDatePeriod = new Date(minPeriod)

    const validPeriod = (other) => !((period.getMonth() === other.getMonth()) 
        && (period.getFullYear() === other.getFullYear()))
    
    const handlePrevius = () => {
        if (period.getMonth() === 0) onPeriodChange(new Date(period.getFullYear()-1, 11, 1))
        else onPeriodChange(new Date(period.getFullYear(), period.getMonth()-1, 1))
    }

    const handleNext = () => {
        if (period.getMonth() === 11) onPeriodChange(new Date(period.getFullYear()+1, 0, 1))
        else onPeriodChange(new Date(period.getFullYear(), period.getMonth()+1, 1))
    }

    return (
        <div className='w-full flex justify-evenly align-center'>
            { validPeriod(minDatePeriod)?
                <button onClick={handlePrevius}> {"<--"} </button>
                : <div></div>
            }
            <div className='text-lg'> {period.getMonth()+1}/{period.getFullYear()} </div>
            { validPeriod(maxPeriod)?
                <button onClick={handleNext}> {"-->"} </button>
                : <div></div>
            }
        </div>
    )
}
