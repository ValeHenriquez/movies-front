import Link from "next/link";
import React from "react";
import MovieCard from "./MovieCard";
import { MovieShortInfo } from "../config/interfaces";

const PopularMovies = ({ popularMovies }: { popularMovies: MovieShortInfo[] }) => {
    return (
        <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center mt-4">
                <h1 className="text-2xl font-medium">Popular Movies</h1>
                <Link
                    href="/movies/popular"
                    className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
                >
                    See all
                </Link>
            </div>
            <div className="grid grid-cols-4 mt-4 gap-4">
                {popularMovies.slice(0, 4).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="grid grid-cols-4 mt-4 gap-4">
                {popularMovies.slice(4, 8).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="grid grid-cols-4 mt-4 gap-4">
                {popularMovies.slice(8, 12).map((movie: MovieShortInfo) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;
