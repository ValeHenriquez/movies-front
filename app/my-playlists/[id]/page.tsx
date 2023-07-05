'use client'
import { CastNavbar } from "@/components/CastNavbar";
import MovieCard from "@/components/MovieCard";
import { MovieShortInfo } from "@/config/interfaces";
import { AppState } from "@/store/store";

import { useSelector } from "react-redux";


const MyPlaylistMovies = () => {
  const selectedPlaylist = useSelector((state: AppState) => state.playlist.selectedPlaylist);
  const movies = selectedPlaylist?.movies

  return (
    <>
      <main className="flex flex-col flex-grow bg-[#171717]">
        <CastNavbar title={selectedPlaylist?.title!} />
        <div className="max-w-full px-4 mx-auto">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">Playlist {selectedPlaylist?.title}</h1>
            <h2 className="text-2xl font-small">{selectedPlaylist?.description}</h2>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 
                        overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-4rem)]">
            {movies?.map((movie: MovieShortInfo) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </>
  )

}

export default MyPlaylistMovies;
