import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Playlist } from '@/config/interfaces';

interface PlaylistState {
    playlists: Playlist[];
    selectedPlaylist: Playlist | null;
}

const initialState: PlaylistState = {
    playlists: [],
    selectedPlaylist: null,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        savePlaylists: (state, action: PayloadAction<Playlist[]>) => {
            state.playlists = action.payload
        },
        saveSelectedPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.selectedPlaylist = action.payload;
        }
    }

})

export const { savePlaylists, saveSelectedPlaylist } = playlistSlice.actions
export default playlistSlice.reducer;