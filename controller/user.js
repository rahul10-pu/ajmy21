import {v4 as uuid} from 'uuid';
import { getUserData, saveUserData } from '../service/user.js';
import {User} from '../model/user.js'
// let users=[];

export const getUsers=(req, res)=>{
    // console.log("get request hit")
    // const usersData = getUserData()
    // res.send(usersData);
    console.log(req.query.id)
    console.log(req.query.age)
    
    User.find().then(
        (result)=>{
            res.send(result)
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:"Got Error while fetching all thee users from the DB"
            })
        }
    )
}
//uuid - Universal unique identifier
//POST request
export const saveUser=(req, res)=>{
    // const existingUsers = getUserData()
    const user= req.body;
    //1. check the minimal requirement
    if(user.name == null || user.age==null || user.username ==null || user.password==null){
        return res.status(402).send({
            error:true,
            message:"User data missing, Include name, age, username, password"
        })
    }
    //2. check if the username already exist
    // const findExist = existingUsers.find(userData => userData.username === user.username)
    // console.log("++++++++++++++")
    // console.log(findExist)
    // if(findExist){ // if true then there will be a conflict
    //     return res.status(409).send({
    //         error: true,
    //         message: "Username alreadly exist"
    //     })
    // }

    // const id=uuid()
    // existingUsers.push({...user, id: id});
    // saveUserData(existingUsers)
    // res.send(id)
    const user1 = new User({
        name:req.body.name,
        age:req.body.age,
        username:req.body.username,
        password:req.body.password,
    })
    user1.save().then(
        (result)=>res.status(201).send(result)
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:err
            })
        }
    )

}
export const getUserByID=(req, res)=>{

    // const existingUsers = getUserData()
    // const findExistUserByID = existingUsers.find(userData => userData.id === req.params.id)
    // // const user =  users.find((user)=> user.id===req.params.id)
    // res.send(findExistUserByID)
    if(req.params.id=="age"){
        getUsersByAge(req, res)
    }else{
        User.findById(req.params.id).then(
            (result)=>{
                res.send(result)
            }
        ).catch(
            (err)=>{
                res.status(500).send({
                    error:true,
                    message:err
                })
            }
        )
    }
   
}
export const deleteByID=(req, res)=>{
    // users =  users.filter((user)=> user.id!==req.params.id)
    // res.send(req.params.id)
    User.findByIdAndDelete(req.params.id).then(
        (result)=>{
            res.send(result)
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:err
            })
        }
    )
}
export const updateUser=(req, res)=>{
    // const user =  users.find((user)=> user.id===req.params.id)
    // user.name=req.body.name
    // res.send(user)
    User.findByIdAndUpdate(req.params.id, {
        age: req.body.age,
        name: req.body.name,
        password: req.body.password
    }).then(
        (result)=>{
         res.send(result)   
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:err
            })
        }
    )
}
export const getUsersByAge = (req, res)=>{
    User.aggregate(
        [{$sort:{age:1}}]
    ).then(
        (result)=>{
            res.send(result)
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:err
            })
        }
    )
}
