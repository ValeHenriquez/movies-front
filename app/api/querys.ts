import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query GetMovies{
        movies{
        id
        title
        poster_path
        vote_average
        }
    }
`;

