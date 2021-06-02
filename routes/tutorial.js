import express from 'express'

import {getTutorialByID} from "../controller/tutorial.js"

const router = express.Router()

router.get("/:id", getTutorialByID)
export default router