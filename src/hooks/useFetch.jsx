import { useState } from 'react'
import { useEffect } from 'react'
 
export const useFetch = ({url, options}) => {
    const [status, setStatus] = useState({
        data: false,
        error: null
    })

    const getFetch = async () => {
        setStatus({
            data: true,
            error: null
        })

        try {
            const resp = await fetch(url, options)
            if(!resp.ok) throw Error(resp.status)
            const data = await resp.json()

            setStatus({
                data,
                error: null
            })
        } catch(error) {
            console.error(error)
            setStatus({
                data: null,
                error
            })
        }
    }

    useEffect(() => {
        console.log(`Calling: ${url}`)
        getFetch(url)
    }, [url])

    return {
        data:       status.data,
        error:      status.error
    };
}
