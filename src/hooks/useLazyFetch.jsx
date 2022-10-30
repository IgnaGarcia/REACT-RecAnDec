import { useState, useEffect } from 'react'
 
export const useLazyFetch = () => {
    const [request, setRequest] = useState({
        url: null,
        options: null
    })

    const [status, setStatus] = useState({
        data: null,
        loading: false,
        error: null
    })

    const getFetch = async () => {
        setStatus({
            data: null,
            loading: true,
            error: null
        })

        try {
            const resp = await fetch(request.url, request.options)
            const data = await resp.json()

            setStatus({
                data,
                loading: false,
                error: null
            })
            console.log(`Called Successfully: ${data.message}`)
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
        if(request.options != null && request.url != null){
            console.log(`Calling: ${request.url}`)
            getFetch()
        }
    }, [request])

    const run = (data) => {
        setRequest(data)
    }

    return {
        run,
        body:       status.data,
        loading:    status.loading,
        error:      status.error
    };
}
