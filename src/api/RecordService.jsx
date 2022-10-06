import { BASE_URL } from "./Service"

export const postRecord = (user, req) => {
    let url = `${BASE_URL}/records`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }
    return { url, options }
}