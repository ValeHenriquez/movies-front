import { getClient } from "@/lib/client";
import { ShowMovies } from "@/components/ShowMovies";
import { GET_MOVIES_COUNT } from "@/graphql/querys";

const MoviesPage = async () => {
    const data = await getClient().query<{ moviesCount: number }>({ query: GET_MOVIES_COUNT });
    return (
        <>
            <ShowMovies
                moviesCount={data.data.moviesCount}
            />
        </>
    );
};

export default MoviesPage;