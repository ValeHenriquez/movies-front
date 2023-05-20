'use client';
import CastCard from "@/app/components/CastCard";
import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Movie, MovieShortInfo, Actor } from "@/app/interfaces";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_MOVIE_ID } from "@/app/api/querys";


const page = ({ params: { id } }: { params: { id: MovieShortInfo["id"] } }) => {

    const [movie, setMovie] = useState<Movie>();

    const { error, loading, data } = useQuery(GET_MOVIE_ID, {
        variables: {
            id: parseInt(id.toString())
        }
    });

    useEffect(() => {
        if (data) {
            setMovie(data.getMovieByID)
        }
    }, [data]);



    return (
        <main className="mt-5 flex flex-col">
            <div className="w-[1000px] max-w-full px-4 mx-auto">
                <div className="flex flex-col mt-6">
                    <div className="flex gap-7">
                        <div className="flex relative">
                            <div className="w-[270px] h-[400px] relative">
                                <Image className="rounded-3xl shadow-lg"
                                    src={
                                        movie?.poster_path
                                            ? `${IMAGE_URL}${movie?.poster_path}`
                                            : `${EMPTY_MOVIE_URL}`
                                    }
                                    alt={movie?.title ?? ''}
                                    fill={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-3 items-center">
                                <h2 className="text-xl font-medium">{movie?.title}</h2>
                                <span
                                    className={`flex flex-col p-2 text-white rounded-md ${movie?.vote_average ?? 1 < 5
                                        ? `bg-red-700`
                                        : movie?.vote_average == 5
                                            ? `bg-orange-700`
                                            : `bg-green-700`
                                        }`}
                                >
                                    {movie?.vote_average}
                                </span>
                            </div>
                            <div className="flex gap-4 items-center mt-4">
                                <h5 className="text-md font-medium">
                                    {dayjs(movie?.release_date).format("MMM DD YYYY")}
                                </h5>
                                <h5 className="text-md font-medium">
                                    {movie?.genres?.map((genre: any) => genre?.name).join(", ")}
                                </h5>
                            </div>
                            <div className="flex flex-col mt-5">
                                <p className="text-md font-normal">{movie?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[1200px] max-w-full px-4 mx-auto">
                <div className="flex flex-col mb-6 mt-6">
                    <div className="flex justify-between items-center mt-4">
                        <h1 className="text-2xl font-medium">Top Cast</h1>
                        <Link
                            href={`/movie/${id}/casts`}
                            className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
                        >
                            See all
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 mt-4 gap-4">
                        {movie?.actors?.slice(0, 4).map((cast: Actor) => (
                            <CastCard key={cast?.id} cast={cast} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;