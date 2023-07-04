'use client';
import React, { useState } from 'react'
import { Movies } from './Movies';
import { MoviesNavbar } from './MoviesNavbar';
import { Movie } from '@/config/interfaces';

interface Props {
  moviesCount: number;
}

export const ShowMovies: React.FC<Props> = ({ moviesCount }) => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [showButtons, setShowButtons] = useState(true);

  const disablePrev = skip - take < 0;

  const disableNext = skip + take >= moviesCount;

  const getNextMovies = () => {
    if (disableNext) {
      return;
    }
    setSkip(skip + take);
  }

  const getPrevMovies = () => {
    if (disablePrev) {
      return;
    }
    setSkip(skip - take);
  }

  return (

    <main className="flex flex-col items-center bg-[#171717] min-h-screen w-full">
      <MoviesNavbar
        setSearchedMovies={setSearchedMovies}
        setShowButtons={setShowButtons}
      />
      {
        searchedMovies.length > 0 ? (
          <Movies
            movies={searchedMovies}
          />) : (
          <Movies
            skip={skip}
            take={take}
          />
        )
      }
      {
        showButtons && (
          <div className="flex justify-between w-1/2 mt-5 ">
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
              onClick={getPrevMovies}
              disabled={disablePrev}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
              onClick={getNextMovies}
              disabled={disableNext}
            >
              Next
            </button>
          </div>
        )
      }

    </main>
  )
}
