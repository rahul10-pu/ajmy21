let users=[];

export const getUsers=(req, res)=>{
    console.log("get request hit")
    res.send(users);
}