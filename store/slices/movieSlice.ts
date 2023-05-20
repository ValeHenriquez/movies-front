import { Movie } from "@/config/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
    movies: Movie[];
    selectedMovie: Movie;
}

const initialState: MovieState = {
    movies: [],
    selectedMovie: {} as Movie
};

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        saveMovies: (state, action) => {
            state.movies = action.payload
        },
        saveSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload
        }
    }
})