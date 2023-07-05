'use client';
import React, { useEffect } from 'react'
import { searchMovies } from '@/config/apollo-client';
import { Movie } from '@/config/interfaces';

interface Props {
  updateMovies: (movies: Movie[]) => void;
  hideButtons: () => void;
  showButtonsAgain: () => void;
}
export const MoviesNavbar: React.FC<Props> = ({ updateMovies, hideButtons, showButtonsAgain }) => {
  const [query, setQuery] = React.useState('')

  const handleSearch = async () => {
    const searchResults = await searchMovies(query)
    updateMovies(searchResults)
  }
  useEffect(() => {
    if (query.length > 4) {
      handleSearch();
      hideButtons();
    } else {
      updateMovies([]);
      showButtonsAgain();
    }
  }, [query]);
  return (
    <>
      <div className="w-full text-white bg-[#0c0c0c] h-20">
        <div className="flex items-center justify-between w-1/2 px-4 py-2 mx-auto pon uno al inicio y el otro final">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">Movies</h1>
          </div>
          <input
            type="text"
            placeholder="Search.."
            className="w-1/2 px-4 py-2 text-black mt-4rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
