'use client';
import { EMPTY_MOVIE_URL, IMAGE_URL } from '@/config/config';
import { Movie } from '@/config/interfaces';
import { AppState } from '@/store/store';
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';
interface Props {
  movie: Movie;
  handleMovieClick: (movie: Movie) => void;
}

export const MovieFormCard: React.FC<Props> = ({ movie, handleMovieClick }) => {
  const selectedMovies = useSelector((state: AppState) => state.movie.selectedMovies);
  return (
    <div className={`w-full flex flex-col
      ${selectedMovies.some((m) => m.id === movie.id) ? 'opacity-50' : ''}
    `}
      key={movie.id}
      onClick={() => handleMovieClick(movie)}
    >
      <div className="w-full h-[200px] relative gap-2">
        <Image className="shadow-lg rounded-3xl"
          src={
            movie?.poster_path
              ? `${IMAGE_URL}${movie?.poster_path}`
              : `${EMPTY_MOVIE_URL}`
          }
          alt={movie?.title}
          // fill={true}
          width={100}
          height={100}
        />
        <div className="flex items-center justify-center">
          <h2 className="text-xs font-semibold ">{movie?.title}</h2>
          <span
            className={`flex flex-col p-1 text-white rounded-md ${movie?.vote_average < 5
              ? `bg-red-700`
              : movie?.vote_average == 5
                ? `bg-orange-700`
                : `bg-green-700`
              }
          w-1/3 text-center mx-auto mt-2 shadow-lg rounded-3xl 
          `}
          >
            {movie?.vote_average}
          </span>
        </div>
      </div>
    </div>
  )
}
