import React, { useState, createContext } from 'react'

export const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
    const [ categories, setCategories ] = useState(() => { 
        const storaged = window.localStorage.getItem("categories")
        return { data: JSON.parse(storaged), loading: !storaged }
    });
    const [ tags, setTags ] = useState(() => { 
        const storaged = window.localStorage.getItem("tags")
        return { data: JSON.parse(storaged), loading: !storaged }
    });
    const [ wallets, setWallets ] = useState(() => { 
        const storaged = window.localStorage.getItem("wallets")
        return { data: JSON.parse(storaged), loading: !storaged }
    });

    const saveCategories = (catList) => {
        setCategories({ data: catList, loading: false })
        window.localStorage.setItem("categories", JSON.stringify(catList))
    }

    const saveTags = (tagList) => {
        setTags({ data: tagList, loading: false })
        window.localStorage.setItem("tags", JSON.stringify(tagList))
    }

    const saveWallets = (walletList) => {
        setWallets({ data: walletList, loading: false })
        window.localStorage.setItem("wallets", JSON.stringify(walletList))
    }

    const contx = { categories, tags, wallets, saveCategories, saveTags, saveWallets }

    return (
        <ConfigContext.Provider value={ contx } >
            { children }
        </ConfigContext.Provider>
    )
}

export default ConfigProvider