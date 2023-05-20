import { Button } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface Props {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setShowForm: (showForm: boolean) => void;
}

const CreatePlaylistForm: React.FC<Props> = (Props) => {
    const { handleFormSubmit, setShowForm } = Props;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form className="bg-white p-8" onSubmit={handleFormSubmit}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add Playlist</h2>
                    <Button onClick={() => setShowForm(false)}>
                        <XCircleIcon className="h-6 w-6 
                    text-gray-500
                  " />
                    </Button>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="title">Title</label>
                    <input className="w-full border border-gray-300 px-2 py-1 rounded-lg" id="title" name="title" type="text" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="description">Description</label>
                    <textarea className="w-full border border-gray-300 px-2 py-1 rounded-lg" id="description" name="description" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="img">Image URL</label>
                    <input className="w-full border border-gray-300 px-2 py-1 rounded-lg" id="img" name="img" type="text" required />
                </div>
                <div className="flex justify-end">
                    <Button className="mr-2" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button color="blue">Add Playlist</Button>
                </div>
            </form>
        </div>
    )
}

export default CreatePlaylistForm;