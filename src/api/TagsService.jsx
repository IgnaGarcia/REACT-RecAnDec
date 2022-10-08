import { BASE_URL } from "./Service"

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