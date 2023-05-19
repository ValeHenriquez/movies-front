import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query GetMovies{
        movies{
        id
        title
        backdrop_path
        popularity
        }
    }
`;