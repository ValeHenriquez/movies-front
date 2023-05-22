'use client'
import MovieCard from "@/components/MovieCard";
import PopularMovies from "@/components/PopularMovies";
import { IMAGE_URL, EMPTY_MOVIE_URL } from "@/config/config";
import { Movie, MovieShortInfo, Playlist } from "@/config/interfaces";
import { GET_PLAYLIST_USER } from "@/graphql/querys";
import { AppState } from "@/store/store";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const MyPlaylistMovies = () => {
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    notFound();
  }
  const selectedPlaylist = useSelector((state: AppState) => state.playlist.selectedPlaylist);
  const movies = selectedPlaylist?.movies

  return (
    <>
      <main className="mt-5 flex flex-col">
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
