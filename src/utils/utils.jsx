
export const invalidToken = (user) => {
    let tkn = user.token.split(".")[1]
    let decoded = JSON.parse(atob(tkn))

    return (decoded.exp * 1000 < Date.now())
}

export const getEndOfMonth = () => {
    let today = new Date()
    let endOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)
    return endOfMonth.toISOString().split('T')[0]
}

export const getFisrtOfPreviusMonth = () => {
    let today = new Date()
    let firstOfPreviusMonth = today.getMonth() === 0? 
        `${today.getFullYear()-1}-01-01`
        : `${today.getFullYear()}-${today.getMonth()}-01`
    return firstOfPreviusMonth
}

