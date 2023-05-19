'use client';
import { gql, useQuery } from '@apollo/client';
import { GET_MOVIES } from "../api/querys";
import PopularMovies from '../components/PopularMovies';


const Movies = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const popularMovies = data.movies

    return (
        <main className="mt-5 flex flex-col">
            <div className="w-[1300px] max-w-full px-4 mx-auto">
                <PopularMovies popularMovies={popularMovies} />
            </div>
        </main>
    )
}

export default Movies


