"use client"
import ShowPlaylists from "@/components/ShowPlaylists";
import { AppState } from "@/store/store";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";

const MyPlaylists = () => {
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        notFound();
    }
    return <>
        <div className="ml-10 mt-10">
            <ShowPlaylists />
        </div>
    </>

}

export default MyPlaylists;