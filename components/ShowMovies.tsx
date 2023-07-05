'use client';
import React, { useState } from 'react'
import { Movies } from './Movies';
import { MoviesNavbar } from './MoviesNavbar';
import { Movie } from '@/config/interfaces';
import { usePagination } from '@/hooks';
import useSearchedMovies from '@/hooks/useSearchedMovies';

interface Props {
  moviesCount: number;
}

export const ShowMovies: React.FC<Props> = ({ moviesCount }) => {
  const { skip, take, nextPage, prevPage, disableNext, disablePrev } = usePagination(moviesCount);
  const { searchedMovies, updateMovies, showButtons, hideButtons, showButtonsAgain } = useSearchedMovies();

  return (

    <main className="flex flex-col items-center bg-[#171717] min-h-screen w-full">
      <MoviesNavbar
        updateMovies={updateMovies}
        hideButtons={hideButtons}
        showButtonsAgain={showButtonsAgain}
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
          <div className="flex justify-between w-1/2 mt-5">
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
              onClick={prevPage}
              disabled={disablePrev}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
              onClick={nextPage}
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
