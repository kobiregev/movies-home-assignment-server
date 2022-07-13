import express from "express";
import {
  getMoviesHandler,
  searchMovieHandler,
} from "../controller/movie.controller";
const router = express.Router();

router.get("/api/movies/:page", getMoviesHandler);

router.get("/api/movie/:title", searchMovieHandler);

export default router;
