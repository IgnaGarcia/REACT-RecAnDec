import { BASE_URL } from "./Service"

export const postWallet = (user, wallet) => {
    let url = `${BASE_URL}/wallets`
    let options = {
        method: 'POST',
        headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wallet)
    }
    return { url, options }
}

export const getWallets = (user) => {
    let url = `${BASE_URL}/wallets`
    let options = {
        method: 'GET',
        headers: {
            "x-access-token": user.token
        }
    }
    return { url, options }
}