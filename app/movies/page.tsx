"use client"
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../graphql/querys";
import MovieCard from "../../components/MovieCard";
import { Movie, MovieShortInfo } from '../../config/interfaces';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "@/store/slices/movieSlice";
import { AppState } from "@/store/store";
import Loading from "@/components/Loading";
import { notFound } from "next/navigation";


const Movies = () => {
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const [getMovies, { error, loading, data }] = useLazyQuery(GET_MOVIES);
    const dispatch = useDispatch();
    const popularMovies = useSelector((state: AppState) => state.movie.movies);
    useEffect(() => {
        getMovies();
    }, [data]);

    useEffect(() => {
        if (data) {
            dispatch(setMovies(data.movies as Movie[]));
        }
    }, [data]);
    if (loading) {
        return <Loading />
    }
    if (!isAuthenticated) {
        notFound();
    }

    return (
        <>
            <main className="mt-5 flex flex-col">
                <div className="max-w-full px-4 mx-auto">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-medium">Movies</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 
                        overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-4rem)]
                    ">
                        {popularMovies.map((movie: MovieShortInfo) => (
                            <MovieCard key={movie?.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Movies;