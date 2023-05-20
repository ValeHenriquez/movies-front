import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from './slices/playlistSlice'
import movieReducer from './slices/movieSlice'

export const store = configureStore({
    reducer: {
        playlist: playlistReducer,
        movie: movieReducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch