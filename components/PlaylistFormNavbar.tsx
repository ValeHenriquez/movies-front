import { searchMovies } from '@/config/apollo-client';
import { Movie } from '@/config/interfaces';
import React, { useEffect } from 'react';

interface Props {
  updateMovies: (movies: Movie[]) => void;
  hideButtons: () => void;
  showButtonsAgain: () => void;
}

export const PlaylistFormNavbar: React.FC<Props> = ({ updateMovies, hideButtons, showButtonsAgain }) => {
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
    <div
      className="flex items-center justify-between w-full h-16 px-6 text-white"
    >
      <h1 className="text-2xl font-medium text-black ">
        Add your firts movie
      </h1>
      <input type="text" placeholder="Search.." name="search"
        className="w-1/2 px-4 py-2 text-black mt-4rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}

      />
    </div>
  );
};
