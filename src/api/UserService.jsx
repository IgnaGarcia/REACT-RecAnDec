import { BASE_URL } from "./Service"

export const refreshToken = async(user) => {
    let data = await fetch(`${BASE_URL}/users/${user._id}/refresh`)
    let body = await data.json()
    return body
}

export const login = (req) => {
    let url = `${BASE_URL}/users/login`
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }
    return { url, options }
}

export const signin = (req) => {
    let url = `${BASE_URL}/users/register`
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }
    return { url, options }
}

export const generateToken = async(id) => {
    let data = await fetch(`${BASE_URL}/users/${id}/refresh`)
    let body = await data.json()
    return body.token
}