import React from 'react'

export const PageCarousel = ({ page, onPageChange, minPage, maxPage }) => {
    const handleClick = (to) => {
        onPageChange(to)
    }

    return (
        <div className='w-1/5 m-auto my-4 flex justify-evenly align-center'>

            { minPage !== page?
                <button className='page-dot' onClick={() => handleClick(page-1)}> {"<"} </button>
                : <button className='page-dot page-dot-disabled' onClick={() => handleClick(page-1)} disabled> {"<"} </button>
            }
            { minPage !== page?
                <button className='page-dot' onClick={() => handleClick(page-1)}> {minPage} </button>
                : <div className='px-3'></div>
            }
            <div className='page-dot page-dot-active'> {page} </div>
            { maxPage !== page?
                <button className='page-dot' onClick={() => handleClick(page+1)}> {maxPage} </button>
                : <div className='px-3'></div>
            }
            { maxPage !== page?
                <button className='page-dot' onClick={() => handleClick(page+1)}> {">"} </button>
                : <button className='page-dot page-dot-disabled' onClick={() => handleClick(page+1)} disabled> {">"} </button>
            }
        </div>
    )
}
