import { Movie } from "@/config/interfaces";
import { useState } from "react";

const useSearchedMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [showButtons, setShowButtons] = useState(true);

  const updateMovies = (movies: Movie[]) => {
    setSearchedMovies(movies);
  }


  const hideButtons = () => {
    setShowButtons(false);
  }

  const showButtonsAgain = () => {
    setShowButtons(true);
  }

  return {
    searchedMovies,
    updateMovies,
    showButtons,
    hideButtons,
    showButtonsAgain
  }
};

export default useSearchedMovies;