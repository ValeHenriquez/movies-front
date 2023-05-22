"use client"
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Movie, Playlist } from "@/config/interfaces";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import Image from "next/image";
import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import { useMutation } from "@apollo/client";
import { UPDATE_PLAYLIST_MUTATION } from "@/graphql/mutations";

interface Props {
  handleEditPlaylist: (playlist: Playlist) => void;
  setShowFormEdit: (setShowFormEdit: boolean) => void;
}

const EditPlaylistForm: React.FC<Props> = (Props) => {

  const playlist = useSelector((state: AppState) => state.playlist.selectedPlaylist);
  const token = useSelector((state: AppState) => state.auth.token);
  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST_MUTATION);

  const { handleEditPlaylist, setShowFormEdit } = Props;
  const [id, setId] = useState<number>(playlist!.id);
  const [title, setTitle] = useState<string>(playlist!.title);
  const [description, setDescription] = useState<string>(playlist!.description);
  //const [movies, setMovies] = useState<number[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>(playlist!.movies);
  const movies: Movie[] = useSelector((state: AppState) => state.movie.movies);


  const handleMovieClick = (movie: Movie) => {
    const isSelected = selectedMovies.some((m) => m.id === movie.id);
    if (isSelected) {
      const updatedMovies = selectedMovies.filter((m) => m.id !== movie.id);
      setSelectedMovies(updatedMovies);
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const editPlaylist = async () => {


    try {
      const response = await updatePlaylist({
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
        variables: {
          updatePlaylistInput: {
            id: id,
            title: title,
            description: description,
            moviesIds: selectedMovies?.map(movie => movie.id),
          }
        }
      })

      //setMovies(newMovies);
      setId(id);
      setTitle(title);
      setDescription(description);

    } catch (error) {
      console.log(error)
    };


    const p: Playlist = {
      id: id,
      title: title,
      description: description,
      movies: selectedMovies,
    }

    handleEditPlaylist(p);
    setShowFormEdit(false);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-10 grid grid-cols-2 gap-4 rounded-lg shadow-lg">
        <div className="">

          <div className="mb-4">
            <label className="block mb-2" htmlFor="title">Title</label>
            <input className="w-full border border-gray-300 px-2 py-1 rounded-lg" id="title" name="title" type="text" required
              defaultValue={playlist?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="description">Description</label>
            <textarea className="w-full border border-gray-300 px-2 py-1 rounded-lg" id="description" name="description" required
              defaultValue={playlist?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex">

            <div className=" mr-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 cursor-pointer" onClick={() => setShowFormEdit(false)}
            >Cancel</div>
            <div className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 cursor-pointer bg-slate-800 text-white"
              onClick={editPlaylist}>Save</div>

          </div>
          <div className="
                        overflow-y-scroll h-[400px]
                    ">
            {
              selectedMovies.map((movie) => {
                return <>
                  <div className="flex gap-2 items-center mt-3 bg-red" key={movie.id}>
                    <h2 className="text-sm font-medium">{movie?.title}</h2>
                    <span
                      className={`flex flex-col p-1 text-white rounded-md ${movie?.vote_average < 5
                        ? `bg-red-700`
                        : movie?.vote_average == 5
                          ? `bg-orange-700`
                          : `bg-green-700`
                        }`}
                    >
                      {movie?.vote_average}
                    </span>
                    <XCircleIcon className="h-5 w-5 cursor-pointer" onClick={() => handleMovieClick(movie)} />
                  </div>

                </>
              })
            }
          </div>
        </div>
        <div className="w-[600px] max-w-full px-4 mx-auto">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">
              Delete movies from your playlist
            </h1>
          </div>
          <div className="grid grid-cols-5 mt-4 gap-4
                        overflow-y-scroll h-[600px]
                    ">
            {movies?.map((movie: Movie) => (
              <div className={`w-full flex flex-col ${selectedMovies.some((m) => m.id === movie.id) ? 'opacity-50' : ''}`}
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
              >
                <div className="w-full h-[200px] relative">
                  <Image className="rounded-3xl shadow-lg"
                    src={
                      movie?.poster_path
                        ? `${IMAGE_URL}${movie?.poster_path}`
                        : `${EMPTY_MOVIE_URL}`
                    }
                    alt={movie?.title}
                    // fill={true}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex gap-2 justify-center items-center mt-3 bg-red">
                  <h2 className="text-sm font-medium">{movie?.title}</h2>
                  <span
                    className={`flex flex-col p-1 text-white rounded-md ${movie?.vote_average < 5
                      ? `bg-red-700`
                      : movie?.vote_average == 5
                        ? `bg-orange-700`
                        : `bg-green-700`
                      }`}
                  >
                    {movie?.vote_average}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default EditPlaylistForm;