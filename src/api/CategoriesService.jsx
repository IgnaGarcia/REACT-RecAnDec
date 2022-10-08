import { BASE_URL } from "./Service"

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