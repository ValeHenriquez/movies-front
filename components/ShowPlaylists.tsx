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
import { useState } from "react";
import PlaylistForm from "./PlaylistForm";
import { Playlist } from "@/config/interfaces";


const ShowPlaylists = () => {
    const [hoveredCard, setHoveredCard] = useState<number>();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showForm, setShowForm] = useState(false);
    const handleCardMouseEnter = (id: number) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(undefined);
    };

    const deletePlaylist = (id: number) => {
        const newPlaylists = playlists.filter((playlist) => playlist.id !== id);
        setPlaylists(newPlaylists);
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
                playlists.map((playlist) => (
                    <Card
                        key={playlist.id}
                        className="w-64 bg-transparent"
                        onMouseEnter={() => handleCardMouseEnter(playlist.id)}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <CardHeader>
                            <div className="relative rounded-lg">
                                <Image src={playlist.movies[0].backdrop_path} alt="playlist" width={200} height={300} />
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