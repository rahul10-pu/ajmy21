import express from 'express'
import {authJWT} from '../middleware/authJWT.js'
import {getTutorialByID,getAllTutorialsByTitle,createTytorial,deleteAllTutorials,deleteTutorialById} from "../controller/tutorial.js"

const router = express.Router()

router.get("/:id",[authJWT.verifyToken], getTutorialByID)//user-(just verify token only)
router.get("/",getAllTutorialsByTitle)//open for all
router.post("/",[authJWT.verifyToken, authJWT.isAdmin],createTytorial)// this can only be access by admin
router.delete("/",[authJWT.verifyToken, authJWT.isModeratorOrAdmin],deleteAllTutorials)//this can be done by admin and moderator
router.delete("/:id", [authJWT.verifyToken, authJWT.isModerator],deleteTutorialById)//moderator
// router.put("/:id",updateTutorialById)

export default router

/*
api 

*/