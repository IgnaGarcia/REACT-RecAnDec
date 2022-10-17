import { BASE_URL } from "./Service"

export const postCommand = (user, command) => {
    let url = `${BASE_URL}/commands`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(command)
    }
    return { url, options }
}

export const getCommand = (user) => {
    let url = `${BASE_URL}/commands`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}

export const deleteCommand = (user, command) => {
    let url = `${BASE_URL}/commands/${command._id}`
    let options = {
        method: 'DELETE',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}