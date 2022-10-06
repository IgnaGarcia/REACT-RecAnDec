import { BASE_URL } from "./Service"
import { getEndOfMonth, getFisrtOfPreviusMonth } from "../utils/utils"

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

export const getBalance = (user) => {
    let url = `${BASE_URL}/records/balance?dateFrom=${getFisrtOfPreviusMonth()}&dateUntil=${getEndOfMonth()}`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        }
    }
    return { url, options }
}