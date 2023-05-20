import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieShortInfo } from "../config/interfaces";


const MovieCard = ({ movie }: { movie: MovieShortInfo }) => {
    return (

        <Link href={`/movies/${movie?.id}`} className="w-full flex flex-col">

            <div className="w-full h-[400px] relative">
                <Image className="rounded-3xl shadow-lg"
                    src={
                        movie?.poster_path
                            ? `${IMAGE_URL}${movie?.poster_path}`
                            : `${EMPTY_MOVIE_URL}`
                    }
                    alt={movie?.title}
                    fill={true}
                />
            </div>
            <div className="flex gap-4 justify-between items-center mt-3 bg-red">
                <h2 className="text-lg font-medium">{movie?.title}</h2>
                <span
                    className={`flex flex-col p-2 text-white rounded-md ${movie?.vote_average < 5
                        ? `bg-red-700`
                        : movie?.vote_average == 5
                            ? `bg-orange-700`
                            : `bg-green-700`
                        }`}
                >
                    {movie?.vote_average}
                </span>
            </div>
        </Link>
    );
};

export default MovieCard;
