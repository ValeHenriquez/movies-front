"use client"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { QueueListIcon, MinusCircleIcon, PlayCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import PlaylistForm from "./PlaylistForm";
import { Playlist } from "@/config/interfaces";
import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AppState } from "@/store/store";
import { GET_PLAYLIST_USER } from "@/graphql/querys";
import { CREATE_PLAYLIST_MUTATION, REMOVE_PLAYLIST_MUTATION } from "@/graphql/mutations";
import { useRouter } from 'next/navigation';
import { saveSelectedPlaylist } from "@/store/slices/playlistSlice";

const ShowPlaylists = () => {

    const token = useSelector((state: AppState) => state.auth.token);
    const router = useRouter();
    const dispatch = useDispatch();
    const [removePlaylist] = useMutation(REMOVE_PLAYLIST_MUTATION);

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const [getPlaylists, { error, loading, data }] = useLazyQuery(GET_PLAYLIST_USER, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            },
        },
    });

    useEffect(() => {
        if (token) {
            getPlaylists();
            setPlaylists(data?.playlistsByUser);
        }
    }, [data]);

    const [hoveredCard, setHoveredCard] = useState<number>();

    const [showForm, setShowForm] = useState(false);
    const handleCardMouseEnter = (id: number) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(undefined);
    };

    const deletePlaylist = async (id: number) => {
        //ACA DEVUELVE UN ERROR? OSEA DICE QUE NO EXISTE EL ID Y OBVIO SI LO BORRO PERO 
        //SI O SI HAY QUE DEVOLVE ALGO DESDE LA MUTACION
        try {
            const response = await removePlaylist({
                context: {
                    headers: {
                        authorization: token ? `Bearer ${token}` : "",
                    },
                },
                variables: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error)
        }

        const newPlaylists = playlists.filter((playlist) => playlist.id !== id);
        setPlaylists(newPlaylists);
    }

    const handleSeeMovieClick = (selectedPlaylist: Playlist) => {
        dispatch(saveSelectedPlaylist(selectedPlaylist as Playlist));
        return router.push(`/my-playlists/${selectedPlaylist.title}`);
    }

    const handleSavePlaylist = (playlist: Playlist) => {
        const newPlaylists = [...playlists, playlist];
        setPlaylists(newPlaylists);
    }

    const handleAddPlaylistClick = () => {
        setShowForm(true);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button onClick={handleAddPlaylistClick}
                className="
                w-64 h-[200px] bg-gray-100 hover:bg-gray-500 rounded-none"
            >
                <Card className="bg-transparent">
                    <div className="flex justify-center items-center h-full w-full">
                        <PlusIcon className="h-14 w-14 text-gray-300" />
                    </div>
                </Card>
            </Button>
            {
                playlists?.map((playlist: Playlist) => (
                    <Card
                        key={playlist.id}
                        className="w-64 bg-transparent"
                        onMouseEnter={() => handleCardMouseEnter(playlist.id)}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <CardHeader>
                            <div className="relative rounded-lg">
                                <Image src={playlist.movies[0].poster_path
                                    ? `${IMAGE_URL}${playlist.movies[0].poster_path}`
                                    : `${EMPTY_MOVIE_URL}`} alt="playlist" width={200} height={300} />
                                <div className="absolute top-0 right-0 h-full bg-black bg-opacity-50 flex items-center p-2">
                                    <Typography color="blue-gray" className="text-white font-normal" variant="h5">
                                        {playlist.movies.length} movies
                                    </Typography>
                                    <QueueListIcon className="h-5 w-5 ml-2 text-white" />
                                </div>
                                {hoveredCard === playlist.id && (
                                    <div className="absolute top-0 right-0 h-full bg-black bg-opacity-70 flex items-center p-2 w-full justify-between">
                                        <Button
                                            className="text-white font-normal flex items-center"
                                            onClick={() => handleSeeMovieClick(playlist)}
                                        >
                                            <PlayCircleIcon className="h-14 w-14" />
                                        </Button>
                                        <Button
                                            className="text-white font-normal flex items-center" onClick={() => deletePlaylist(playlist.id)}
                                        >
                                            <MinusCircleIcon className="h-14 w-14" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <h2 className="text-xl font-bold">{playlist.title}</h2>
                            <p className="text-sm text-gray-500">{playlist.description}</p>
                        </CardBody>
                    </Card>
                ))
            }
            {
                showForm && (
                    <PlaylistForm handleSavePlaylist={handleSavePlaylist} setShowForm={setShowForm} />
                )
            }
        </div >
    );
};

export default ShowPlaylists;