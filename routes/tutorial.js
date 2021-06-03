import express from 'express'

import {getTutorialByID,getAllTutorialsByTitle,createTytorial,deleteAllTutorials,deleteTutorialById} from "../controller/tutorial.js"

const router = express.Router()

router.get("/:id", getTutorialByID)
router.get("/",getAllTutorialsByTitle)
router.post("/",createTytorial)
router.delete("/",deleteAllTutorials)
router.delete("/:id", deleteTutorialById)
// router.put("/:id",updateTutorialById)

export default router