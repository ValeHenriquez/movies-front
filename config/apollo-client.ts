import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Movie } from "./interfaces";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

export default client;

export const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await client.query({
            query: gql`
            query SearchMovies($query: String!) {
              searchMovies(query: $query) {
                id
                title
                poster_path
                vote_average
              }
            }
            `,
            variables: {
                query,
            },
        })
        return response.data.searchMovies;
    } catch (error) {
        console.log(error);
        return [];
    }
}

