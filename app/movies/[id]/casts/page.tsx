import { Actor, Movie, MovieShortInfo } from "@/config/interfaces";
import { GET_ACTORS_MOVIE_ID } from "@/graphql/querys";
import CastCard from "@/components/CastCard";
import Loading from "@/components/Loading";
import { getClient } from "@/lib/client";
import { CastNavbar } from "@/components/CastNavbar";


const CastPage = async ({ params: { id } }: { params: { id: MovieShortInfo["id"] } }) => {
    const data = await getClient().query<{ getMovieByID: Movie }>({
        query: GET_ACTORS_MOVIE_ID,
        variables: {
            id: parseInt(id.toString())
        }
    });

    if (data.loading) {
        return <Loading />
    }

    const actors = data.data.getMovieByID.actors;

    return (
        <main className="flex flex-col flex-grow
            bg-[#171717]
        ">
            <CastNavbar title="Cast" />
            <div className="w-full max-w-full px-4 mx-auto">
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