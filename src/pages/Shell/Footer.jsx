import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { getCategories } from '../../api/CategoriesService'
import { getTags } from '../../api/TagsService'
import { getWallets } from '../../api/WalletService'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'

export const Footer = () => {
    const { user, saveUser } = useContext(UserContext)
    const { categories, categoriesError } = useFetch(getCategories(user))
    const { tags, tagsError } = useFetch(getTags(user))
    const { wallets, walletsError } = useFetch(getWallets(user))

    return (
        <footer className="flex items-center fixed w-screen bottom-0 h-16">
            <div className="w-60 bg-back-800 text-back-100 py-4 px-5">
                { user.name }
            </div>
            <div className='flex items-center bg-back-200 px-3 flex-1 h-full'>
                <form>
                    <input type="checkbox" name="isOut" id="isOut"/>
                    <label for="isOut"> Es Ingreso? </label>

                    <label for="amount"> Monto </label>
                    <input type="number" name="amount" id="amount"/>

                    <label for="amount"> Categoria </label>
                    <select name="category" id="categorySelector">
                        <option value="idalimentos"> Alimentos </option>
                        <option value="idimpuestos"> Impuestos </option>
                    </select>

                    <label for="amount"> Etiquetas </label>
                    <select name="tag" id="tagSelector" >
                        <option value="idgolosinas"> Golosinas </option>
                        <option value="idextraordinario"> Extraordinario </option>
                    </select>

                    <label for="amount"> Billetera </label>
                    <select name="wallet" id="walletSelector">
                        <option value="idefectivo"> Efectivo </option>
                    </select>

                    <input type="submit" value="Enviar"/>
                </form>
            </div>
        </footer>
    )
}
