import express from 'express';

import {getUsers} from '../controller/user.js';

const router=express.Router();

router.get("/",getUsers)
// router.post("/", saveUser)

// router.get("/id",getUsersById)


export default router;