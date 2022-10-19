import { BASE_URL } from "./Service"

export const postCategorie = (user, cat) => {
    let url = `${BASE_URL}/categories`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    }
    return { url, options }
}

export const getCategories = (user) => {
    let url = `${BASE_URL}/categories`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}