import { BASE_URL } from "./Service"

export const postLimit = (user, limit) => {
    let url = `${BASE_URL}/limits`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(limit)
    }
    return { url, options }
}

export const updateLimit = (user, limit) => {
    let url = `${BASE_URL}/limits/${limit._id}`
    let options = {
        method: 'PUT',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(limit)
    }
    return { url, options }
}

export const deleteLimit = (user, limit) => {
    let url = `${BASE_URL}/limits/${limit}`
    let options = {
        method: 'DELETE',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}

export const getLimites = (user) => {
    let url = `${BASE_URL}/limits`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}