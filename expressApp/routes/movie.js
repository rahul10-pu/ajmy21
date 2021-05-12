import express from "express";
import {getMovies,postMovies,getMoviesById,deletMoviesById,updateMovieNameById,updateMovies} from "../controller/movie.js"

const router = express.Router();

router.get("/",getMovies);
router.get("/:id",getMoviesById);
router.post("/",postMovies);
router.delete("/:id",deletMoviesById);
router.patch("/:id",updateMovieNameById);
router.put("/:id",updateMovies);


export default router;