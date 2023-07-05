'use client';
import { MovieShortInfo } from '@/config/interfaces';
import { gql, useQuery } from '@apollo/client';
import React from 'react'
import MovieCard from './MovieCard';
import Loading from './Loading';

interface Props {
  skip?: number;
  take?: number;
  movies?: MovieShortInfo[];
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

export const Movies: React.FC<Props> = ({ skip, take, movies }) => {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      skip,
      take
    }
  });

  if (loading) return <Loading />;

  return (
    <>
      <div className="w-11/12 max-w-full px-4 mx-auto mt-10 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-5 gap-2 mt-2 max-w-screen">

          {
            movies && movies?.length > 0 ? (
              movies!.map((movie: MovieShortInfo) => (
                <MovieCard key={movie?.id} movie={movie} />
              ))
            ) : (
              data?.movies.map((movie: MovieShortInfo) => (
                <MovieCard key={movie?.id} movie={movie} />
              ))
            )
          }
        </div>
      </div>
    </>
  )
}
