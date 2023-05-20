import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

interface PlaylistState {
    playlist: string[];
    selectedPlaylist: string;
}

const initialState: PlaylistState = {
    playlist: [],
    selectedPlaylist: ''
};

interface SavePlayistState {
    playlist: string[];
}

interface SaveSelectedPlaylist {
    selectedPlaylist: string;
}
const playlistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        savePlaylists: (state, action: PayloadAction<SavePlayistState>) => {
            state.playlist = action.payload.playlist
        },
        saveSelectedPlaylist: (state, action: PayloadAction<SaveSelectedPlaylist>) => {
            state.selectedPlaylist = action.payload.selectedPlaylist;
        }
    }

})

export const { savePlaylists, saveSelectedPlaylist } = playlistSlice.actions
export const selectPlaylist = (state: AppState) => state.playlist.playlist
export default playlistSlice.reducer;