import fetch, { Response } from "node-fetch";
import config from "config";
import { IMovie } from "../types";

const apiUrl = config.get<string>("apiUrl");

export const getMovieByImdbId = async (id: string): Promise<IMovie| undefined> => {
  try {
    const res: Response = await fetch(`${apiUrl}&i=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
