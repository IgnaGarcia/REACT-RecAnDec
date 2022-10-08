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

export const getFisrtOfMonth = () => {
    let today = new Date()
    let firstOfMonth = today.getMonth() === 0? 
        `${today.getFullYear()-1}-12-01`
        : `${today.getFullYear()}-${today.getMonth()+1}-01`
    return firstOfMonth
}

export const getFisrtOfPreviusMonth = () => {
    let today = new Date()
    let firstOfPreviusMonth = today.getMonth() === 0? 
        `${today.getFullYear()-1}-12-01`
        : `${today.getFullYear()}-${today.getMonth()}-01`
    return firstOfPreviusMonth
}

const colorsArr = [
    colors.red[400], 
    colors.blue[400], 
    colors.emerald[400], 
    colors.orange[400],
    colors.cyan[400], 
    colors.yellow[400], 

    colors.red[700],
    colors.blue[700],
    colors.emerald[700],
    colors.orange[700],
    colors.cyan[700],
    colors.yellow[700],

    colors.red[500],
    colors.blue[500], 
    colors.emerald[500], 
    colors.orange[500], 
    colors.cyan[500], 
    colors.yellow[500], 

    colors.red[300],
    colors.blue[300], 
    colors.emerald[300], 
    colors.orange[300],
    colors.cyan[300], 
    colors.yellow[300], 
]    
export const getRandomColor = () => {
    return colorsArr[Math.floor(Math.random()*colorsArr.length)]
}

export const getColor = (index) => {
    return colorsArr[index % colorsArr.length]
}

export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor='middle' dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};

