import { BASE_URL } from "./Service"

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