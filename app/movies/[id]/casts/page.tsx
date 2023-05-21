'use client';
import { MovieShortInfo, Actor } from "@/config/interfaces";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ACTORS_MOVIE_ID } from "@/graphql/querys";
import CastCard from "@/components/CastCard";
import { AppState } from "@/store/store";
import { useSelector } from "react-redux";
import { notFound } from "next/navigation";
import Loading from "@/components/Loading";



const CastPage = ({ params: { id } }: { params: { id: MovieShortInfo["id"] } }) => {
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const [actors, setActors] = useState<Actor[]>([]);

    const { error, loading, data } = useQuery(GET_ACTORS_MOVIE_ID, {
        variables: {
            id: parseInt(id.toString())
        }
    });

    useEffect(() => {
        if (data) {
            setActors(data.getMovieByID.actors)
        }
    }, [data]);

    if (!isAuthenticated) {
        notFound();
    }

    if (loading) {
        return <Loading />
    }


    return (
        <main className="mt-5 flex flex-col mb-6 flex-grow">
            <div className="max-w-full px-4 mx-auto w-full">
                <div className="flex flex-col mb-6 mt-6">
                    <h1 className="text-2xl font-medium">All Cast</h1>
                </div>
                <div className="grid grid-cols-4 mt-4 gap-4 overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-8rem)] scrollbar-hide">
                    {actors?.map((cast: Actor) => (
                        <CastCard key={cast?.id} cast={cast} />
                    ))}
                </div>
            </div>
        </main>

    );
};

export default CastPage;