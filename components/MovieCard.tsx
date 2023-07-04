import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieShortInfo } from "../config/interfaces";


const MovieCard = ({ movie }: { movie: MovieShortInfo }) => {
    return (

        <Link href={`/movies/${movie?.id}`} className="flex flex-col w-3/4">

            <div className="relative w-full">
                <Image className="shadow-lg rounded-3xl"
                    src={
                        movie?.poster_path
                            ? `${IMAGE_URL}${movie?.poster_path}`
                            : `${EMPTY_MOVIE_URL}`
                    }
                    alt={movie?.title}
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex items-center justify-between mt-3 bg-red">
                <h2 className="text-lg font-medium text-white ">{movie?.title}</h2>
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
