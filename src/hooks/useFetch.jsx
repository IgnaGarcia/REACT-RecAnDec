import { useState, useEffect } from 'react'
 
export const useFetch = ({ url, options }) => {
    const [status, setStatus] = useState({
        body: null,
        loading: true,
        error: null
    })

    const getFetch = async () => {
        setStatus({
            body: null,
            loading: true,
            error: null
        })

        try {
            const resp = await fetch(url, options)
            if(!resp.ok) throw Error(resp.status)
            const data = await resp.json()

            setStatus({
                body: data,
                loading: false,
                error: null
            })
        } catch(error) {
            console.error(error)
            setStatus({
                body: null,
                loading: false,
                error
            })
        }
    }

    useEffect(() => {
        console.log(`Calling: ${url}`)
        getFetch(url)
    }, [url])

    return {
        body:       status.body,
        loading:    status.loading,
        error:      status.error
    };
}
