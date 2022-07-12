export type GetMoviesParams = {
  page: string;
};

export interface BaseResponse {
  Response?: string;
  Error?: string;
}

export type GetMoviesResponseData = BaseResponse & {
  Search?: ISearchMovie[];
  totalResults?: string;
};

export interface ISearchMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

export enum Type {
  Movie = "movie",
}

export interface IMovie extends BaseResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
