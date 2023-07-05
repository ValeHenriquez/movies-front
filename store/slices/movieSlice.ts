import { Movie } from "@/config/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
    moviesCount: number;
    selectedMovies: Movie[];
}

const initialState: MovieState = {
    moviesCount: 0,
    selectedMovies: []
};

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        setMoviesCount(state, action: PayloadAction<number>) {
            state.moviesCount = action.payload
        },

        setSelectedMovies(state, action: PayloadAction<Movie[]>) {
            state.selectedMovies = action.payload
        }
    }
})

export const { setMoviesCount, setSelectedMovies } = movieSlice.actions

export default movieSlice.reducer