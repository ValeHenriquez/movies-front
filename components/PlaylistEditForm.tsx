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
import { usePagination, useSearchedMovies } from "@/hooks";
import { PlaylistFormNavbar } from "./PlaylistFormNavbar";
import { MoviesForm } from "./MoviesForm";

interface Props {
  handleEditPlaylist: (playlist: Playlist) => void;
  setShowFormEdit: (setShowFormEdit: boolean) => void;
}

const EditPlaylistForm: React.FC<Props> = (Props) => {
  const token = useSelector((state: AppState) => state.auth.token);
  const moviesCount = useSelector((state: AppState) => state.movie.moviesCount);
  const playlist = useSelector((state: AppState) => state.playlist.selectedPlaylist);
  const { skip, take, nextPage, prevPage, disableNext, disablePrev } = usePagination(moviesCount);
  const { searchedMovies, updateMovies, showButtons, hideButtons, showButtonsAgain } = useSearchedMovies();

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST_MUTATION);
  const { handleEditPlaylist, setShowFormEdit } = Props;
  const [id, setId] = useState<number>(playlist!.id);
  const [title, setTitle] = useState<string>(playlist!.title);
  const [description, setDescription] = useState<string>(playlist!.description);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>(playlist!.movies);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="grid grid-cols-2 gap-4 p-10 bg-white rounded-lg shadow-lg">
        <div className="">

          <div className="mb-4">
            <label className="block mb-2" htmlFor="title">Title</label>
            <input className="w-full px-2 py-1 border border-gray-300 rounded-lg" id="title" name="title" type="text" required
              defaultValue={playlist?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="description">Description</label>
            <textarea className="w-full px-2 py-1 border border-gray-300 rounded-lg" id="description" name="description" required
              defaultValue={playlist?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex">

            <div className="px-4 py-2 mr-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300" onClick={() => setShowFormEdit(false)}
            >Cancel</div>
            <div className="px-4 py-2 text-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 bg-slate-800"
              onClick={editPlaylist}>Save</div>

          </div>
          <div className="
                        overflow-y-scroll h-[400px]
                    ">
            {
              selectedMovies.map((movie) => {
                return <>
                  <div className="flex items-center gap-2 mt-3 bg-red" key={movie.id}>
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
                    <XCircleIcon className="w-5 h-5 cursor-pointer" onClick={() => handleMovieClick(movie)} />
                  </div>

                </>
              })
            }
          </div>
        </div>
        <div className="px-4 mx-auto">
          <PlaylistFormNavbar
            updateMovies={updateMovies}
            hideButtons={hideButtons}
            showButtonsAgain={showButtonsAgain}
          />
          {
            searchedMovies.length > 0 ? (
              <MoviesForm
                movies={searchedMovies}
                handleMovieClick={handleMovieClick}
              />) : (
              <MoviesForm
                skip={skip}
                take={take}
                handleMovieClick={handleMovieClick}
              />
            )
          }
          {
            showButtons && (
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={prevPage}
                  disabled={disablePrev}
                >
                  Prev
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={nextPage}
                  disabled={disableNext}
                >
                  Next
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default EditPlaylistForm;