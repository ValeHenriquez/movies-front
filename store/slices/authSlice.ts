import { User } from "@/config/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
interface LoginPayload {
    user: User;
    token: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: token,
    isAuthenticated: token ? true : false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<LoginPayload>) {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
            state.token = null
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer