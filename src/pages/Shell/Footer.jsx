import React from 'react'
import { useContext, useEffect } from 'react'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../contexts/UserContext'
import { postRecord } from '../../api/RecordService'
import { ConfigContext } from '../../contexts/ConfigContext'
import { useState } from 'react'

export const Footer = () => {
    const { user } = useContext(UserContext)
    const { categories, tags, wallets } = useContext(ConfigContext)
    const recordResponse = useLazyFetch()
    let categoriesOut = []
    let categoriesIn = []
    const [categoriesToShow, setCategoriesToShow] = useState([])

    const { formState, onInputChange, reset } = useForm({
        isIn: false,
        amount: "",
        category: "",
        tags: "",
        wallet: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        let wallet = formState.wallet !== "" ? formState.wallet : null
        let tags = formState.tags !== "" ? formState.tags : null

        let req = {
            "amount": formState.amount,
            "category": formState.category,
            "isOut": !formState.isIn,
            wallet,
            tags
        }
        recordResponse.run(postRecord(user, req))
    }

    useEffect(() => {
        if(!recordResponse.loading && (recordResponse.error || recordResponse.body)){
            if (recordResponse.error) {
                alert("Error al Enviar");
            } else if (recordResponse.body) {
                alert("Resgistro Enviado!");
                reset()
            }
        }
    }, [recordResponse.loading])

    useEffect(() => {
        formState.isIn? setCategoriesToShow(categoriesIn) : setCategoriesToShow(categoriesOut)
    }, [formState.isIn])

    const setCategories = () => {
        categoriesOut = categories.data.filter(el => el.isOut)
        categoriesIn = categories.data.filter(el => !el.isOut)
    }

    return (
        <footer className="flex items-center fixed w-screen bottom-0 h-16">
            <div className="w-60 bg-back-800 text-back-100 py-4 px-5">
                { user.name }
            </div>
            <div className='flex items-center bg-back-200 px-3 flex-1 h-full'>
                <form className="flex justify-evenly items-center w-full" onSubmit={handleSubmit} action="#">
                    <div>
                        <input type="checkbox" name="isIn" id="isIn" 
                            value={formState.isIn} onChange={onInputChange}/>
                        <label htmlFor="isIn"> Es Ingreso? </label>
                    </div>

                    <input type="number" placeholder="Monto" name="amount" id="amount" min={1}  
                        value={formState.amount} onChange={onInputChange}/>

                    { categories.loading?
                        <span>Cargando...</span>
                        : <>
                            {setCategories()}
                            <select name="category" id="categorySelector"  required
                                value={formState.category} onChange={onInputChange}>
                                <option value="" disabled> -- Categoria -- </option>
                                {
                                    categoriesToShow.map(el => 
                                        <option value={el._id} key={el._id}> {el.label} </option> 
                                    )
                                }
                            </select>
                        </>
                    }
                    
                    { tags.loading?
                        <span>Cargando...</span>
                        : 
                        <select name="tags" id="tagSelector"
                            value={formState.tags} onChange={onInputChange}>
                            <option value="" disabled> -- Etiquetas -- </option>
                            {
                                tags.data.map(el => 
                                    <option value={el._id} key={el._id}> {el.label} </option> 
                                )
                            }
                        </select>
                    }

                    { wallets.loading?
                        <span>Cargando...</span>
                        : 
                        <select name="wallet" id="walletSelector"
                            value={formState.wallet} onChange={onInputChange}>
                            <option value="" disabled> -- Billetera -- </option>
                            {
                                wallets.data.map(el => 
                                    <option value={el._id} key={el._id}> {el.label} </option> 
                                )
                            }
                        </select>
                    }
                    { 
                        recordResponse.loading? <button className='btn-disabled' disabled> "Enviando..." </button>   
                            : <button className='btn'> Enviar </button>
                    }
                </form>
            </div>
        </footer>
    )
}
