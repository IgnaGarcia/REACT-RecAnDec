import { BASE_URL } from "./Service"

export const postTag = (user, tag) => {
    let url = `${BASE_URL}/tags`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    }
    return { url, options }
}

export const getTags = (user) => {
    let url = `${BASE_URL}/tags`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}