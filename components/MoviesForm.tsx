import { Movie } from '@/config/interfaces';
import { gql, useQuery } from '@apollo/client';
import React from 'react'
import Loading from './Loading';
import { MovieFormCard } from './MovieFormCard';

interface Props {
  skip?: number;
  take?: number;
  movies?: Movie[];
  handleMovieClick: (movie: Movie) => void;
}

const GET_MOVIES = gql`
query GetMovies($skip: Int, $take: Int){
  movies (skip: $skip, take: $take) {
    id
    title
    poster_path
    vote_average
  }
}
`;

export const MoviesForm: React.FC<Props> = ({ skip, take, movies, handleMovieClick }) => {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      skip,
      take
    }
  });

  if (loading) return <Loading />;
  return (

    <>
      <div className="">
        <div className="grid grid-cols-5 gap-4">

          {
            movies && movies?.length > 0 ? (
              movies!.map((movie: Movie) => (
                <MovieFormCard key={movie?.id} movie={movie}
                  handleMovieClick={handleMovieClick}
                />
              ))
            ) : (
              data?.movies.map((movie: Movie) => (
                <MovieFormCard key={movie?.id} movie={movie}
                  handleMovieClick={handleMovieClick}
                />
              ))
            )
          }
        </div>
      </div>
    </>

  )
}