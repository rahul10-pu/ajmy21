
import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config"
import { User } from "../model/user"
const verifyToken=(req, res,next)=>{
    let token=req.headers["x-access-token"]
    if(!token){
        res.status(403).send({
            message:"No toekn provided! Forbidden"
        })
    }

    //now you have the token
    jwt.verify(token,secret, (err, decode)=>{
        if(err){
            res.status(401).send({
                message:"Unauthorized"
            })
        }
        req.userID=decode.id
        next();
    })
}
const isAdmin=(req, res,next)=>{
    User.findByPk(req.userID)
        .then(
            user=>{
                user.getRoles()
                    .then(
                        roles=>{
                            for(let i=0;i<roles.length;i++){
                                
                            }
                        }
                    )
                    .catch()
            }
        )
        .catch()
}