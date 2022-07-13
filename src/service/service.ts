import { GetDefaultMoviesListResponse, IMovie } from "../types";
import fetch, { Response } from "node-fetch";
import config from "config";

const apiUrl = config.get<string>("apiUrl");

export const getMovieByImdbId = async (
  id: string
): Promise<IMovie[]> => {
  const res: Response = await fetch(`${apiUrl}&i=${id}`);
  return await res.json();
};

export const getDefaultMoviesList = async (
  page: string,
  defaultSearchMovie: string
): Promise<GetDefaultMoviesListResponse> => {
  const res = await fetch(`${apiUrl}&page=${page}&s=${defaultSearchMovie}`);
  return await res.json();
};

export const getMovieByTitle = async (
  title: string
): Promise<IMovie> => {
  const res = await fetch(`${apiUrl}&t=${title}`);
  return await res.json();
};
