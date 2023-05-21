import { configureStore } from '@reduxjs/toolkit'
import { playlistReducer, movieReducer, authReducer } from './slices'

export const store = configureStore({
    reducer: {
        playlist: playlistReducer,
        movie: movieReducer,
        auth: authReducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch