import ShowPlaylists from "@/components/ShowPlaylists";
import { GET_MOVIES_COUNT } from "@/graphql/querys";
import { getClient } from "@/lib/client";

const MyPlaylists = async () => {
    const data = await getClient().query<{ moviesCount: number }>({ query: GET_MOVIES_COUNT });

    return <>
        <ShowPlaylists
            moviesCount={data.data.moviesCount}
        />
    </>

}

export default MyPlaylists;