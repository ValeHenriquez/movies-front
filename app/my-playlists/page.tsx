import ShowPlaylists from "@/components/ShowPlaylists";
import { NextPage } from "next";

const MyPlaylists: NextPage = () => {
    return <>
        <div className="mt-10 ml-10">
            <ShowPlaylists />
        </div>
    </>

}

export default MyPlaylists;