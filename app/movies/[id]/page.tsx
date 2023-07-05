import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Movie, MovieShortInfo, Actor } from "@/config/interfaces";
import { GET_MOVIE_ID } from "@/graphql/querys";
import CastCard from "@/components/CastCard";
import Loading from "@/components/Loading";
import { getClient } from "@/lib/client";
import { CastNavbar } from "@/components/CastNavbar";


const MovieId = async ({ params: { id } }: { params: { id: MovieShortInfo["id"] } }) => {
    const data = await getClient().query<{ getMovieByID: Movie }>({
        query: GET_MOVIE_ID,
        variables: {
            id: parseInt(id.toString())
        }
    });

    if (data.loading) {
        return <Loading />
    }
    const movie = data.data.getMovieByID;

    return (
        <>
            <main className="flex flex-col flex-grow bg-[#171717]">
                <CastNavbar title={movie.title} />
                <div className="w-[1000px] max-w-full px-4 mx-auto flex-grow ">
                    <div className="flex flex-col mt-6">
                        <div className="flex gap-7">
                            <div className="relative flex">
                                <div className="w-[270px] h-[400px] relative">
                                    <Image className="shadow-lg rounded-3xl"
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
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-medium text-white ">{movie?.title}</h2>
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
                                <div className="flex items-center gap-4 mt-4">
                                    <h5 className="font-medium text-white text-md">
                                        {dayjs(movie?.release_date).format("MMM DD YYYY")}
                                    </h5>
                                    <h5 className="font-medium text-white text-md">
                                        {movie?.genres?.map((genre: any) => genre?.name).join(", ")}
                                    </h5>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <p className="font-normal text-white text-md">{movie?.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-full px-4 mx-auto">
                    <div className="flex flex-col mt-6 mb-6">
                        <div className="flex items-center justify-between mt-4">
                            <h1 className="text-2xl font-medium text-white">Top Cast</h1>
                            <div className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50">
                                <Link
                                    href={`/movies/${id}/casts`}
                                >
                                    See all
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            {movie?.actors?.slice(0, 5).map((cast: Actor) => (
                                <CastCard key={cast?.id} cast={cast} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default MovieId;