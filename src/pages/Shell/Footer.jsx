import React from 'react'
import { useContext, useEffect } from 'react'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../contexts/UserContext'
import { postRecord } from '../../api/RecordService'
import { ConfigContext } from '../../contexts/ConfigContext'
import { useState } from 'react'
import Select from 'react-select'
import { useSimpleSelect } from '../../hooks/useSimpleSelect'
import CustomSelect from '../../components/CustomSelect'

export const Footer = () => {
    const { user, closeSesion } = useContext(UserContext)
    const { categories, tags, wallets, clear } = useContext(ConfigContext)
    const recordResponse = useLazyFetch()
    let categoriesOut = []
    let categoriesIn = []
    const [categoriesToShow, setCategoriesToShow] = useState([])

    const { formState, onInputChange, reset } = useForm({
        isIn: false,
        amount: "",
        tags: "",
        wallet: ""
    })
    const catSelect = useSimpleSelect()
    const tagSelect = useSimpleSelect()
    const walletSelect = useSimpleSelect()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!formState.amount || formState.amount <= 0 ) {
            alert("Debe ingresar un monto")
            return
        }
        console.log(catSelect)
        if(catSelect.selected <= 0 || !catSelect.selected.value) {
            alert("Debe seleccionar una categoria")
            return
        }
        let wallet = walletSelect.selected && walletSelect.selected.value ? walletSelect.selected.value : null
        let tags = tagSelect.selected && tagSelect.selected.value ? [tagSelect.selected.value] : null

        let req = {
            "amount": formState.amount,
            "category": catSelect.selected.value,
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
        categoriesOut = categories.data.filter(el => el.isOut).map(el => { return { value: el._id, label: el.label } })
        categoriesIn = categories.data.filter(el => !el.isOut).map(el => { return { value: el._id, label: el.label } })
    }

    let gettedList = (list) => list.data.map(el => {
        return { value: el._id, label: el.label }
      })

    const onCloseSesion = () => {
        clear()
        closeSesion()
    }

    return (
        <footer className="flex items-center fixed w-screen bottom-0 h-16">
            <div className="w-60 bg-back-800 text-back-100 text-md py-4 px-5 flex justify-between items-center">
                <span>{ user.name }</span>
                <button onClick={onCloseSesion}
                    className='text-left text-xs py-1 px-3 bg-back-600 w-min rounded-full hover:bg-red-700'> Salir </button>
            </div>
            <div className='flex items-center bg-back-200 px-3 flex-1 h-full'>
                <form className="flex justify-evenly items-center w-full" onSubmit={handleSubmit} action="#">
                    <div>
                        <input type="checkbox" name="isIn" id="isIn"
                            value={formState.isIn} onChange={onInputChange}/>
                        <label htmlFor="isIn"> Es Ingreso? </label>
                    </div>

                    <input type="number" placeholder="Monto" name="amount" id="amount" min={1} className='input w-1/6'
                        value={formState.amount} onChange={onInputChange}/>

                    { categories.loading?
                        <span>Cargando...</span>
                        : <>
                            {setCategories()}
                            <CustomSelect options={categoriesToShow} value={catSelect.selected} menuPlacement='top'
                                onChange={catSelect.onSelectChange} placeholder="Categoria" className="w-1/6"/>
                        </>
                    }
                    
                    { tags.loading?
                        <span>Cargando...</span>
                        : 
                        <CustomSelect options={gettedList(tags)} value={tagSelect.selected} menuPlacement='top'
                            onChange={tagSelect.onSelectChange} placeholder="Etiqueta" className="w-1/6"/>
                    }

                    { wallets.loading?
                        <span>Cargando...</span>
                        : 
                        <CustomSelect options={gettedList(wallets)} value={walletSelect.selected} menuPlacement='top'
                            onChange={walletSelect.onSelectChange} placeholder="Billetera" className="w-1/6"/>
                    }
                    { 
                        recordResponse.loading? <button className='btn-disabled w-1/6' disabled> "Enviando..." </button>   
                            : <button className='btn'> Enviar </button>
                    }
                </form>
            </div>
        </footer>
    )
}
