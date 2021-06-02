import db from "../model/index.js";
const Tutorial = db.tutorials
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