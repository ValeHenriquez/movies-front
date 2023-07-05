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
import { Playlist, User } from "@/config/interfaces";
import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AppState } from "@/store/store";
import { GET_PLAYLIST_USER } from "@/graphql/querys";
import { REMOVE_PLAYLIST_MUTATION } from "@/graphql/mutations";
import { useRouter } from 'next/navigation';
import { saveSelectedPlaylist } from "@/store/slices/playlistSlice";
import EditPlaylistForm from "./PlaylistEditForm";
import { setMoviesCount } from "@/store/slices/movieSlice";
interface Props {
    moviesCount: number;
}
const ShowPlaylists: React.FC<Props> = ({ moviesCount }) => {

    const token = useSelector((state: AppState) => state.auth.token);
    const router = useRouter();
    const dispatch = useDispatch();
    dispatch(setMoviesCount(moviesCount));

    const [removePlaylist] = useMutation(REMOVE_PLAYLIST_MUTATION);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const [hoveredCard, setHoveredCard] = useState<number>();
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const [getPlaylists, { error, loading, data }] = useLazyQuery(
        GET_PLAYLIST_USER,
        {
            context: {
                headers: {
                    authorization: token ? `Bearer ${token}` : "",
                },
            },
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (token) {
            getPlaylists();
        }
    }, [token]);

    useEffect(() => {
        if (data && data.playlistsByUser) {
            setPlaylists(data.playlistsByUser);
        }
    }, [data]);



    const handleCardMouseEnter = (id: number) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(undefined);
    };

    const deletePlaylist = async (id: number) => {
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

    const handleEditPlaylist = (editedPlaylist: Playlist) => {
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.id === editedPlaylist.id) {
                return editedPlaylist;
            }
            return playlist;
        });
        setPlaylists(updatedPlaylists);
    }

    const handleEditPlaylistClick = (selectedPlaylist: Playlist) => {
        dispatch(saveSelectedPlaylist(selectedPlaylist as Playlist));
        setShowFormEdit(true);
    }

    const handleAddPlaylistClick = () => {
        setShowForm(true);
    };

    return (
        <div className="bg-[#171717] min-h-screen w-full">
            <div className="grid grid-cols-1 gap-4 mt-10 ml-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                <Button onClick={handleAddPlaylistClick}
                    className="w-64 h-[200px] bg-gray-100 hover:bg-gray-500 rounded-none">
                    <Card className="bg-transparent">
                        <div className="flex items-center justify-center w-full h-full">
                            <PlusIcon className="text-gray-300 h-14 w-14" />
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
                                    {playlist.movies.length > 0 ? (
                                        <Image
                                            src={`${IMAGE_URL}${playlist.movies[0].poster_path}`}
                                            alt="playlist"
                                            width={200}
                                            height={300}
                                        />
                                    ) : (
                                        <Image
                                            src={`${EMPTY_MOVIE_URL}`}
                                            alt="playlist"
                                            width={200}
                                            height={300}
                                        />
                                    )}

                                    <div className="absolute top-0 right-0 flex items-center h-full p-2 bg-black bg-opacity-50">
                                        <Typography color="blue-gray" className="font-normal text-white" variant="h5">
                                            {playlist.movies.length} movies
                                        </Typography>
                                        <QueueListIcon className="w-5 h-5 ml-2 text-white" />
                                    </div>
                                    {hoveredCard === playlist.id && (
                                        <div className="absolute top-0 right-0 flex items-center justify-between w-full h-full p-2 bg-black bg-opacity-70">
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Button
                                                    className="flex font-normal text-white items-top"
                                                    onClick={() => handleSeeMovieClick(playlist)}
                                                >
                                                    <PlayCircleIcon className="h-14 w-14" />
                                                </Button>

                                                <Button
                                                    className="flex items-center font-normal text-white"
                                                    onClick={() => handleEditPlaylistClick(playlist)}
                                                >
                                                    <PlusIcon className="h-14 w-14" />
                                                </Button>

                                                <Button
                                                    className="flex items-center font-normal text-white"
                                                    onClick={() => deletePlaylist(playlist.id)}
                                                >
                                                    <MinusCircleIcon className="h-14 w-14" />
                                                </Button>


                                            </div>

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
                {
                    showFormEdit && (
                        <EditPlaylistForm handleEditPlaylist={handleEditPlaylist} setShowFormEdit={setShowFormEdit} />
                    )
                }
            </div >
        </div>
    );
};

export default ShowPlaylists;