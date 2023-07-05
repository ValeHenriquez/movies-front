'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
    FilmIcon,
    ListBulletIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useLazyQuery } from "@apollo/client";
import { User } from "@/config/interfaces";
import { GET_PROFILE } from "@/graphql/querys";
import Loading from "./Loading";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { SideBarItem } from "./SideBarItem";

const SideBar = () => {
    ;
    const [user, setUser] = useState<User>();
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const playlistsNames = ["Playlist 1", "Playlist 2", "Playlist 3"];
    const token = useSelector((state: AppState) => state.auth.token);
    const dispatch = useDispatch();
    const router = useRouter();
    const [profile, { error, loading, data }] = useLazyQuery(GET_PROFILE, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            },
        },
    });

    useEffect(() => {
        if (token && !user) {
            profile();
            setUser(data?.profile);
        }
    }, [data]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        router.push("/auth/login");
    };

    if (loading) return <Loading />;
    return (
        <>
            <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl bg-[#0c0c0c] text-white rounded-none">
                <div className="p-4 mb-2">
                    <div className="flex flex-col items-center justify-center mt-4">
                        <img
                            src="https://i.pravatar.cc/300"
                            alt="profile"
                            className="w-24 h-24 rounded-full"
                        />
                        <Typography variant="h5" color="blue-gray">
                            {user?.name}
                        </Typography>
                    </div>

                </div>
                <List className="flex flex-col items-start justify-start w-full space-y-2">
                    <SideBarItem description="Profile" href="/auth/profile" />
                    <SideBarItem description="Playlists" href="/my-playlists" />
                    <SideBarItem description="Movies" href="/movies" />
                    <ListItem onClick={handleLogout}
                        className="flex items-center justify-start w-full h-20 px-4 py-2 text-white bg-red-500 rounded-lg hover:text-white hover:shadow-xl hover:bg-red-600"
                    >
                        <ListItemPrefix>
                            <PowerIcon className="w-5 h-5 mr-2" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal" variant="h5">
                            Log Out
                        </Typography>
                    </ListItem>
                </List>
            </Card>
        </>
    );
}

export default SideBar;