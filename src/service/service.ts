import fetch, { Response } from "node-fetch";
import config from "config";
import { GetDefaultMoviesListResponse, IMovie } from "../types";

const apiUrl = config.get<string>("apiUrl");

export const getMovieByImdbId = async (
  id: string
): Promise<IMovie[] | undefined> => {
  try {
    const res: Response = await fetch(`${apiUrl}&i=${id}`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getDefaultMoviesList = async (
  page: string,
  defaultSearchMovie: string
): Promise<GetDefaultMoviesListResponse> => {
  console.log(`${apiUrl}&page=${page}&s=${defaultSearchMovie}`);
  const response = await fetch(
    `${apiUrl}&page=${page}&s=${defaultSearchMovie}`
  );
  return await response.json();
};
