import { Request, Response } from "express";
import { GetMoviesParams, GetMoviesResponseData } from "../types";
import config from "config";
import fetch from "node-fetch";
import { getMovieByImdbId } from "../service/service";

const apiUrl = config.get<string>("apiUrl");
// omdbApi requires search query
const defaultSearchMovie = "Marvel";

export async function getMoviesHandler(
  req: Request<GetMoviesParams, {}, {}>,
  res: Response
) {
  try {
    // p = page
    const { page } = req.params;
    const response = await fetch(
      `${apiUrl}&page=${page}&s=${defaultSearchMovie}`
    );
    const data: GetMoviesResponseData = await response.json();
    console.log(data.totalResults)
    if (data.Error) return res.status(400).send(data.Error);

    const parsedMovies = await Promise.all(
      data.Search!.map((movie) => getMovieByImdbId(movie.imdbID))
    );
    
    if (parsedMovies) {
      return res.status(200).send(parsedMovies);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}
