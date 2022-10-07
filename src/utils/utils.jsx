import colors from 'tailwindcss/colors'

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

export const getRandomColor = () => {
    const colorsArr = [colors.rose[400], colors.rose[700],
        colors.fuchsia[400], colors.fuchsia[700],
        colors.blue[400], colors.blue[700],
        colors.cyan[400], colors.cyan[700],
        colors.teal[400], colors.teal[700],
        colors.emerald[400], colors.emerald[700],
        colors.yellow[400], colors.yellow[700],
        colors.orange[400], colors.orange[700],
        colors.red[400], colors.red[700]]
    return colorsArr[Math.floor(Math.random()*colorsArr.length)]
}

