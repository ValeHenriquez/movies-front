import { gql } from "@apollo/client";

export const GET_MOVIES_COUNT = gql`
query MoviesCount{
    moviesCount
}
`;

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

export const GET_MOVIE_ID = gql`
query getMovieByID($id: Int!) {
  getMovieByID(id: $id) {
      id
      adult
      backdrop_path
      original_language
      original_title
      overview
      popularity
      poster_path
      release_date
      title
      video
      vote_average
      vote_count
    actors{
      id
      name
      character
      profile_path
    }
    genres{
      id
      name
    }
    
  }
}
`;

export const GET_ACTORS_MOVIE_ID = gql`
query getMovieByID($id: Int!) {
  getMovieByID(id: $id) {  
    actors{
      id
      name
      character
      profile_path
    } 
  }
}
`;

export const GET_PROFILE = gql`
query profile {
  profile {
    name
		email
    password
  }
}
`;


export const GET_PLAYLIST_USER = gql`
query playlistsByUser {
  playlistsByUser {
    id
    title
    description
    movies{
      id
      adult
      backdrop_path
      original_language
      original_title
      overview
      popularity
      poster_path
      release_date
      title
      video
      vote_average
      vote_count
    actors{
      id
      name
      character
      profile_path
    }
    genres{
      id
      name
    }
    }
  }
}
`;