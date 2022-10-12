import React, { useState } from 'react'
import { getColor } from '../utils/utils'

export const Chip = ({ index, label }) => {
    const color = getColor(index)
    return (
        <div className='chip' style={{borderColor: `${color}`, backgroundColor: `${color}45`}}> 
            {label} 
        </div>        
    )
}
