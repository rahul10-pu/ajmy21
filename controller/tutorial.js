import db from "../model/index.js";
const Tutorial = db.tutorials
const Op=db.Sequelize.Op;
export const getTutorialByID = (req,res)=>{
    Tutorial.findByPk(req.params.id)
    .then(
        result=>{
            res.send(result)
        }
    )
    .catch(
        err=> res.status(404).send(err)
    )
}
export const  getAllTutorialsByTitle=(req, res)=>{
    var title1=req.query.title
    console.log(title1)
    // var condition=title ? { title : {[Op.ilike]:`${title}`}} : null
    Tutorial.findAll({where:{title:title1}})
        .then(
            data=>res.status(201).send(data)
        )
        .catch(
            err=>{
                res.status(500).send({
                    message : err.message || "Some error occured while db operation" 
                })
            }
        )
}
export const createTytorial=(req, res)=>{
    //TODO : check the mandatory feilds and thorw error response id required
    const tutorial={
        title: req.body.title,
        description:req.body.description,
        published:req.body.published
    }
    Tutorial.create(tutorial)
    .then(
        data=>res.status(201).send(data)
    )
    .catch(
        err=>{
            res.status(500).send({
                message : err.message || "Some error occured while db operation" 
            })
        }
    )

}
export const deleteAllTutorials=(req, res)=>{
    Tutorial.destroy(
        {
            where:{},
            truncate:false
        }
    )
    .then(
        result=>res.status(201).send({
            message:`${result} tutorial got deleted`
        })
    )
    .catch(
        err=>{
            res.status(500).send({
                message : err.message || "Some error occured while db operation" 
            })
        }
    )
}
export const deleteTutorialById=(req, res)=>{
    Tutorial.destroy(
        {
            where:{id:req.params.id}
        }
    )
    .then(
        result=>{
            if(result==1){
                res.status(200).send({
                    message:`${result} tutorial got deleted`
                })
            }else{
                res.status(422).send({
                    message:`${req.params.id} doesnot exist in the table`
                })
            }
        }
    )
    .catch(
        err=>{
            res.status(500).send({
                message : err.message || "Some error occured while db operation" 
            })
        }
    )
}