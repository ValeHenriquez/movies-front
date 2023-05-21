import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import Image from "next/image";
import React from "react";
import { Actor } from "../config/interfaces"


const CastCard = ({ cast }: { cast: Actor }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-[200px] h-[200px] relative">
                <Image className="rounded-3xl shadow-lg"
                    src={
                        cast?.profile_path
                            ? `${IMAGE_URL}${cast?.profile_path}`
                            : `${EMPTY_MOVIE_URL}`
                    }
                    alt={cast?.name}
                    fill={true}
                />
            </div>
            <div className="flex flex-col gap-1 mt-3">
                <h2 className="text-lg font-medium">{cast?.name}</h2>
                <h2 className="text-lg font-medium">{cast?.character}</h2>
            </div>
        </div>
    );
};

export default CastCard;
