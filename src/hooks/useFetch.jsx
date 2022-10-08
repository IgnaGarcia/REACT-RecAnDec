import { useState } from 'react'
import { useEffect } from 'react'
 
export const useFetch = ({ url, options }) => {
    const [status, setStatus] = useState({
        data: null,
        loading: true,
        error: null
    })

    const getFetch = async () => {
        setStatus({
            data: null,
            loading: true,
            error: null
        })

        try {
            const resp = await fetch(url, options)
            if(!resp.ok) throw Error(resp.status)
            const data = await resp.json()

            setStatus({
                data,
                loading: false,
                error: null
            })
        } catch(error) {
            console.error(error)
            setStatus({
                data: null,
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
        body:       status.data,
        loading:    status.loading,
        error:      status.error
    };
}
