
export interface Playlist {
    id: number;
    title: string;
    description: string;
    movies: Movie[];
}

export interface User {
    name: string;
    email: string;
    password: string;
    playlists?: Playlist[];
}

export interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string;
    order: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Movie extends MovieShortInfo {
    adult: boolean;
    backdrop_path: string;
    genres: Genre[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: string;
    video: boolean;
    vote_count: number;
    actors: Actor[];
}

export interface MovieShortInfo {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export interface LoginResponse {
    user: User;
    token: string;
}