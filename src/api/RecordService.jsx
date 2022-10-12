import { BASE_URL } from "./Service"
import { getEndOfMonth, getFisrtOfMonth, getFisrtOfPreviusMonth } from "../utils/utils"

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

export const getHistorical = (user, by, filter) => {
    let filterStr = ""
    if (filter) {
        let len = filter.length
        if (len !== 0) {
            filterStr = filterStr + "?"
            filter.forEach((el, idx) => {
                filterStr = (idx +1 === len) ? filterStr + `filter=${el.value}` : filterStr + `filter=${el.value}&`
            })
        }
    }
    
    let url = `${BASE_URL}/records/historical/${by}${filterStr}`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        }
    }
    return { url, options }
}

export const getSummary = (user, by, filter, period) => {
    let filterStr = ""
    if (filter) {
        let len = filter.length
        if (len !== 0) {
            filterStr = filterStr + "&"
            filter.forEach((el, idx) => {
                filterStr = (idx +1 === len) ? filterStr + `filter=${el.value}` : filterStr + `filter=${el.value}&`
            })
        }
    }
    let dateFilter = `dateFrom=${getFisrtOfMonth(period)}&dateUntil=${getEndOfMonth(period)}`
    let url = `${BASE_URL}/records/summary/${by}?${dateFilter}${filterStr}`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        }
    }
    return { url, options }
}