import {v4 as uuid} from 'uuid';
let users=[];

export const getUsers=(req, res)=>{
    console.log("get request hit")
    res.send(users);
}
//uuid - Universal unique identifier
export const saveUser=(req, res)=>{
    const user= req.body;
    const id=uuid()
    users.push({...user, id: id});
    // console.log(users)
    res.send(id)
}
export const getUserByID=(req, res)=>{
    const user =  users.find((user)=> user.id===req.params.id)
    res.send(user)
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
