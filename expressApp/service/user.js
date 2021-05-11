import fs from 'fs';
export const getUserData = ()=>{
    const jsonData = fs.readFileSync('C:\\Users\\MUSIB\\OneDrive\\Desktop\\acap\\expressApp\\service\\users.json')
    console.log(jsonData)
    return JSON.parse(jsonData)
}
export const saveUserData = (jsonData)=>{
    const stringifyData = JSON.stringify(jsonData)
    fs.writeFileSync('C:\\Users\\MUSIB\\OneDrive\\Desktop\\acap\\expressApp\\service\\users.json', stringifyData)
}