const BASE_URL = "https://api-rec-an-dec.vercel.app"

export const refreshToken = async(user) => {
    let data = await fetch(`${BASE_URL}/users/${user._id}/refresh`)
    let body = await data.json()
    return body
}

export const generateToken = async(id) => {
    let data = await fetch(`${BASE_URL}/users/${id}/refresh`)
    let body = await data.json()
    return body.token
}