"use client"
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MOVIES } from "../api/querys";
import MovieCard from "../components/MovieCard";
import { MovieShortInfo } from '../interfaces';
import React, { useEffect, useState } from "react";


const Movies = () => {

    const [getMovies, { error, loading, data }] = useLazyQuery(GET_MOVIES);
    const [popularMovies, setPopularMovies] = useState<MovieShortInfo[]>([]);

    useEffect(() => {
        getMovies();
        if (data) {
            setPopularMovies(data.movies);
        }
    }, [data]);

    return (
        <main className="mt-5 flex flex-col">
            <div className="w-[1300px] max-w-full px-4 mx-auto">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-medium">Movies</h1>
                </div>
                <div className="grid grid-cols-4 mt-4 gap-4">
                    {popularMovies.map((movie: MovieShortInfo) => (
                        <MovieCard key={movie?.id} movie={movie} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Movies;