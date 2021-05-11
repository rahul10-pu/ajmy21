export const getUserData = ()=>{
    const jsonData = fs.readFileSync('../dataFiles/users.json')
    console.log(jsonData)
    return JSON.parse(jsonData)
}
export const saveUserData = (jsonData)=>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('../dataFiles/users.json', stringifyData)
}