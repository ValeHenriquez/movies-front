import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
    FilmIcon,
    ListBulletIcon
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useLazyQuery } from "@apollo/client";
import { User } from "@/config/interfaces";
import { GET_PROFILE } from "@/graphql/querys";
import Loading from "./Loading";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const SideBar = () => {
    const [open, setOpen] = React.useState(0);
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

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        router.push("/auth/login");
    };
    if (!isAuthenticated) {
        return null;
    }
    return (
        <>
            {loading && <Loading />}
            <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl bg-slate-800 text-white">
                <div className="mb-2 p-4">
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
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5 mr-2" />
                        </ListItemPrefix>
                        <Link href="/auth/profile">
                            <Typography color="blue-gray" className="mr-auto font-normal" variant="h5">
                                Profile
                            </Typography>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Accordion
                            open={open === 0}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-0">
                                <ListItemPrefix>
                                    <ListBulletIcon className="h-5 w-5 mr-2" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    My Playlists
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody className="py-1  ">
                                <List className="p-0">
                                    {
                                        playlistsNames.map((name, index) => (
                                            <ListItem key={index}>
                                                <ListItemPrefix>
                                                    <PlayCircleIcon className="h-3 w-3 mr-2" />
                                                </ListItemPrefix>
                                                {name}
                                            </ListItem>
                                        ))
                                    }
                                    <ListItem>
                                        <ListItemPrefix>
                                        </ListItemPrefix>
                                        <Link href="/my-playlists">

                                            View all playlists
                                        </Link>
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                    </ListItem>


                    <ListItem>
                        <ListItemPrefix>
                            <FilmIcon className="h-5 w-5 mr-2" />
                        </ListItemPrefix>
                        <Link href="/movies">
                            <Typography color="blue-gray" className="mr-auto font-normal" variant="h5">
                                Movies
                            </Typography>
                        </Link>
                    </ListItem>

                    <div className="absolute bottom-0 mb-4">
                        <ListItem onClick={handleLogout}>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5 mr-2" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal" variant="h5">
                                Log Out
                            </Typography>
                        </ListItem>
                    </div>
                </List>
            </Card>
        </>
    );
}

export default SideBar;