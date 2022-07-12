import express from "express";
import { getMoviesHandler } from "../controller/movie.controller";
const router = express.Router();

router.get("/api/movies/:page", getMoviesHandler);

export default router;
