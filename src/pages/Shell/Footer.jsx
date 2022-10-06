import React from 'react'
import { useContext, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../contexts/UserContext'
import { getCategories } from '../../api/CategoriesService'
import { getTags } from '../../api/TagsService'
import { getWallets } from '../../api/WalletService'
import { postRecord } from '../../api/RecordService'

export const Footer = () => {
    const { user, saveUser } = useContext(UserContext)
    const categoryResponse = useFetch(getCategories(user))
    const tagResponse = useFetch(getTags(user))
    const walletResponse = useFetch(getWallets(user))
    const recordResponse = useLazyFetch()

    const { formState, onInputChange, reset } = useForm({
        isIn: false,
        amount: "",
        category: "",
        tags: "",
        wallet: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        let wallet = formState.wallet != "" ? formState.wallet : null
        let tags = formState.tags != "" ? formState.tags : null

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
        console.log("USE Effect", recordResponse)
        if(!recordResponse.loading && (recordResponse.error || recordResponse.body)){
            if (recordResponse.error) {
                alert("Error al Enviar");
            } else if (recordResponse.body) {
                alert("Resgistro Enviado!");
                reset()
            }
        }
    }, [recordResponse.loading])

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
                        <label for="isIn"> Es Ingreso? </label>
                    </div>

                    <input type="number" placeholder="Monto" name="amount" id="amount" min={1}  
                        value={formState.amount} onChange={onInputChange}/>

                    { categoryResponse.loading?
                        <span>Cargando...</span>
                        : 
                        <select name="category" id="categorySelector"  required
                            value={formState.category} onChange={onInputChange}>
                            <option value="" disabled> -- Categoria -- </option>
                            {
                                categoryResponse.body.data.map(el => 
                                    <option value={el._id} key={el._id}> {el.label} </option> 
                                )
                            }
                        </select>
                    }
                    
                    { tagResponse.loading?
                        <span>Cargando...</span>
                        : 
                        <select name="tags" id="tagSelector"
                            value={formState.tags} onChange={onInputChange}>
                            <option value="" disabled> -- Etiquetas -- </option>
                            {
                                tagResponse.body.data.map(el => 
                                    <option value={el._id} key={el._id}> {el.label} </option> 
                                )
                            }
                        </select>
                    }

                    { walletResponse.loading?
                        <span>Cargando...</span>
                        : 
                        <select name="wallet" id="walletSelector"
                            value={formState.wallet} onChange={onInputChange}>
                            <option value="" disabled> -- Billetera -- </option>
                            {
                                walletResponse.body.data.map(el => 
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
