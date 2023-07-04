import Link from "next/link";
import React from "react";
import MovieCard from "./MovieCard";
import { MovieShortInfo } from "../config/interfaces";

const PopularMovies = ({ popularMovies }: { popularMovies: MovieShortInfo[] }) => {
    return (
        <div className="flex flex-col mb-6">
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-2xl font-medium">Popular Movies</h1>
                <Link
                    href="/movies/popular"
                    className="px-5 py-2 font-normal text-white bg-slate-800 text-md"
                >
                    See all
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {popularMovies.slice(0, 4).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {popularMovies.slice(4, 8).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {popularMovies.slice(8, 12).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;
