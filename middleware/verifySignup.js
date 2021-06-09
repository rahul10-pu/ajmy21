import pgdb from '../model/index.js'
const ROLE=pgdb.ROLES
const User=pgdb.users
export const checkDuplicateUsernameOrEmail=(req, res, next)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(
        user=>{
            if(user){
                res.status(400).send({
                    message:"Failed! Username already exist"
                })
                return
            }
            //now check for the email
            User.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(
                email=>{
                    if(email){
                        res.status(400).send({
                            message:"Failed! Email already exist"
                        })
                        return
                    }
                    //now it seems username and email is unique now we can proceed to the next
                    //function
                    next();
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
export const checkRolesExisted=(req, res, next)=>{
    for(let i=0;i<req.body.roles.length;i++){
        if(ROLE.include(req.body.roles[i]==false)){
            res.status(400).send({
                message : "Failed! Roles does not exist "+ req.body.roles[i]
            })
            return;
        }
       
    }
    next();
}