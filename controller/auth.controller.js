import bcryptjs from "bcryptjs"
import db from '../model/index.js'
import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config.js"
const User=db.users
const Role=db.roles
const Op=db.Sequelize.Op
export const signup=(req, res)=>{
    //check username, email, password exist
    //encrypt the password
    //store all data in db
    User.create({
        username:req.body.username,
        email:req.body.email,
        password: bcryptjs.hashSync(req.body.password, 8)

    }).then(
        user=>{
            if(req.body.roles){
                Role.findAll({
                    where:{
                        [Op.or]:req.body.roles
                    }
                })
                .then(roles=>{
                    user.setRoles(roles)
                        .then(
                            res.status(201).send({
                                message:"Signup Completed!"
                            })
                        )
                        .catch(
                            (err)=>{
                                res.status(500).send({
                                    error:true,
                                    message:"Got Error while fetching all thee users from the DB"
                                })
                            }
                        )
                })
                .catch(
                    (err)=>{
                        res.status(500).send({
                            error:true,
                            message:"Got Error while fetching all thee users from the DB"
                        })
                    }
                )
            }
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                error:true,
                message:"Got Error while fetching all thee users from the DB"
            })
        }
    )
    console.log(bcryptjs.hashSync(req.body.password, 8))
}
export const signin=(req, res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(
        user=>{
            var isPasswordValid=bcryptjs.compareSync(req.body.password, user.password)
            if(!isPasswordValid){
                res.status(401).send({
                   message: "Invalid Password"
                })
            }
            //ok soo username and password is verified
            //now let us build token
            var token=jwt.sign({id:user.id}, secret,{
                expiresIn:86400//24hr
            });
            var authorities=[]
            user.getRoles().then(
                roles=>{
                    for(let i=0;i<roles.length;i++){
                        authorities.push("ROLE_"+roles[i].name.toUpperCase()) 
                    }
                    res.status(200).send({
                        token:token,
                        username:user.username,
                        roles:authorities
                    })
                    
                }
            )
        }
    )
    .catch( (err)=>{
        res.status(500).send({
            error:true,
            message:"Got Error while fetching all thee users from the DB"
        })
    })
}