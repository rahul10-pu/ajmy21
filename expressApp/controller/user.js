import {v4 as uuid} from 'uuid';
import { getUserData, saveUserData } from '../service/user.js';
// let users=[];

export const getUsers=(req, res)=>{
    console.log("get request hit")
    const usersData = getUserData()
    res.send(usersData);
}
//uuid - Universal unique identifier
//POST request
export const saveUser=(req, res)=>{
    const existingUsers = getUserData()
    const user= req.body;
    //1. check the minimal requirement
    if(user.name == null || user.age==null || user.username ==null || user.password==null){
        return res.status(402).send({
            error:true,
            message:"User data missing, Include name, age, username, password"
        })
    }
    //2. check if the username already exist
    const findExist = existingUsers.find(userData => userData.username === user.username)
    // console.log("++++++++++++++")
    // console.log(findExist)
    if(findExist){ // if true then there will be a conflict
        return res.status(409).send({
            error: true,
            message: "Username alreadly exist"
        })
    }

    const id=uuid()
    existingUsers.push({...user, id: id});
    saveUserData(existingUsers)
    res.send(id)
}
export const getUserByID=(req, res)=>{

    const existingUsers = getUserData()
    const findExistUserByID = existingUsers.find(userData => userData.id === req.params.id)
    // const user =  users.find((user)=> user.id===req.params.id)
    res.send(findExistUserByID)
}
export const deleteByID=(req, res)=>{
    users =  users.filter((user)=> user.id!==req.params.id)
    res.send(req.params.id)
}
export const updateNameByID=(req, res)=>{
    const user =  users.find((user)=> user.id===req.params.id)
    user.Name=req.body.Name;
    res.send(user)
}
export const updateByID = (req,res) =>{
    users = users.map(x =>{
        if(x.id === req.params.id)
        {
            x.Name = req.body.Name;
            x.Age = req.body.Age;
            x.Engineer = req.body.Engineer;
        }
        return x;
    })
    res.sendStatus(201);
}
