import express from 'express'
import { signin, signup } from '../controller/auth.controller.js'
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignup.js'
const router = express.Router()

router.post("/signup",[checkDuplicateUsernameOrEmail, checkRolesExisted], signup)
router.post("/signin",signin)

export default router