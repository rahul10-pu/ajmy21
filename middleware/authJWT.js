
import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config.js"
import db from '../model/index.js'
const User=db.users
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
                                if(roles[i].name=="admin"){
                                    console.log("User is admin")
                                    next()
                                    return
                                }
                            }
                            //user is not an admin
                            res.status(403).send({
                                message:"Forbidden"
                            })
                        }
                    )
                    .catch(
                        (err)=>{
                            res.status(500).send({
                                error:true,
                                message:"No Roles found for the User"
                            })
                        }
                    )
            }
        )
        .catch(
            (err)=>{
                res.status(500).send({
                    error:true,
                    message:"Not able to find User"
                })
            }
        )
}

const isModerator=(req, res,next)=>{
    User.findByPk(req.userID)
        .then(
            user=>{
                user.getRoles()
                    .then(
                        roles=>{
                            for(let i=0;i<roles.length;i++){
                                if(roles[i]=="moderator"){
                                    console.log("User is moderator")
                                    next()
                                    return
                                }
                            }
                            //user is not an admin
                            res.status(403).send({
                                message:"Forbidden"
                            })
                        }
                    )
                    .catch(
                        (err)=>{
                            res.status(500).send({
                                error:true,
                                message:"Got Error while fetching all thee users from the DB"
                            })
                        }
                    )
            }
        )
        .catch(
            (err)=>{
                res.status(500).send({
                    error:true,
                    message:"Got Error while fetching all thee users from the DB"
                })
            }
        )
}

const isModeratorOrAdmin=(req, res,next)=>{
    User.findByPk(req.userID)
        .then(
            user=>{
                user.getRoles()
                    .then(
                        roles=>{
                            for(let i=0;i<roles.length;i++){
                                if(roles[i]=="moderator" || roles[i]=="admin"){
                                    console.log("User is moderator or admin")
                                    next()
                                    return
                                }
                            }
                            //user is not an admin
                            res.status(403).send({
                                message:"Forbidden"
                            })
                        }
                    )
                    .catch(
                        (err)=>{
                            res.status(500).send({
                                error:true,
                                message:"Got Error while fetching all thee users from the DB"
                            })
                        }
                    )
            }
        )
        .catch(
            (err)=>{
                res.status(500).send({
                    error:true,
                    message:"Got Error while fetching all thee users from the DB"
                })
            }
        )
}
export const authJWT={
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isModerator:isModerator,
    isModeratorOrAdmin:isModeratorOrAdmin
}