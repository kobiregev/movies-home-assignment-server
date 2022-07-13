import { Request, Response } from "express";
import { GetMoviesParams } from "../types";
import config from "config";
import { getDefaultMoviesList, getMovieByImdbId } from "../service/service";

// omdbApi requires search query
const defaultSearchMovie = "Marvel";

export async function getMoviesHandler(
  req: Request<GetMoviesParams, {}, {}>,
  res: Response
) {
  try {
    // p = page
    const { page } = req.params;

    const { Search, Error, totalResults } = await getDefaultMoviesList(
      page,
      defaultSearchMovie
    );

    if (Error || !Search) return res.status(400).send(Error);

    const parsedMovies = await Promise.all(
      Search.map((movie) => getMovieByImdbId(movie.imdbID))
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
