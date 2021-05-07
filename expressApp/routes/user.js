import express from 'express';

import {getUsers, saveUser, getUserByID, deleteByID, updateNameByID} from '../controller/user.js';

const router=express.Router();

router.get("/",getUsers)
router.get("/:id",getUserByID)
router.post("/", saveUser)
router.delete("/:id", deleteByID)
router.patch("/:id", updateNameByID)
// router.put("/:id", updateByID)


// router.get("/id",getUsersById)


export default router;