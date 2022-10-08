
export const invalidToken = (user) => {
    let tkn = user.token.split(".")[1]
    let decoded = JSON.parse(atob(tkn))

    return (decoded.exp * 1000 < Date.now())
}