export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  time: string;
  vote_average: number;
  overview: string;
  genre: Genre[];
  genre_ids: number[];
};
