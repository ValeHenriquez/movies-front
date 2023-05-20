import { Movie } from "@/config/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
    movies: Movie[];
}

const initialState: MovieState = {
    movies: [],
};

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload
        },
    }
})

export const { setMovies } = movieSlice.actions

export default movieSlice.reducer