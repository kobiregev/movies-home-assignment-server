import { Request, Response } from "express";
import { GetMoviesParams, SearchMovieParams } from "../types";
import {
  getDefaultMoviesList,
  getMovieByImdbId,
  getMovieByTitle,
} from "../service/service";
import { getPagination } from "../utils/utils";

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

    const detaliedMovies = await Promise.all(
      Search.map((movie) => getMovieByImdbId(movie.imdbID))
    );

    if (detaliedMovies) {
      // Search.length is equal to number of results we get from Omdb api
      const pagination = getPagination(+page, +totalResults!, Search.length);
      return res.status(200).send({ movies: detaliedMovies, ...pagination });
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

export async function searchMovieHandler(
  req: Request<SearchMovieParams, {}, {}>,
  res: Response
) {
  try {
    const { title } = req.params;

    const { Error, ...movie } = await getMovieByTitle(title);
    if (Error) return res.status(400).send(Error);

    return res.status(200).send(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}
