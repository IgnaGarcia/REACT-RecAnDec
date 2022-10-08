import { BASE_URL } from "./Service"

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