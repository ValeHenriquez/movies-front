import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IMovieCard {
    id: number;
    title: string;
    backdrop_path: string;
    popularity: number;
}

const MovieCard = ({ movie }: { movie: IMovieCard }) => {
    return (
        <Link href={`/movie/${movie?.id}`} className="w-full flex flex-col">
            <div className="w-full h-[400px] relative">
                <Image
                    src={
                        movie?.backdrop_path
                            ? `${IMAGE_URL}${movie?.backdrop_path}`
                            : `${EMPTY_MOVIE_URL}`
                    }
                    alt={movie?.title}
                    fill={true}
                />
            </div>
            <div className="flex gap-4 justify-between items-center mt-3 bg-red">
                <h2 className="text-lg font-medium">{movie?.title}</h2>
                <span
                    className={`flex flex-col p-2 text-white rounded-md ${movie?.popularity < 5
                        ? `bg-red-700`
                        : movie?.popularity == 5
                            ? `bg-orange-700`
                            : `bg-green-700`
                        }`}
                >
                    {movie?.popularity}
                </span>
            </div>
        </Link>
    );
};

export default MovieCard;
