import { EMPTY_MOVIE_URL, IMAGE_URL } from "@/config/config";
import Image from "next/image";
import React from "react";
import { Actor } from "../config/interfaces"


const CastCard = ({ cast }: { cast: Actor }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-[200px] h-[200px] relative">
                <Image className="shadow-lg rounded-3xl"
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
                <h2 className="text-lg font-medium text-white">{cast?.name}</h2>
                <h2 className="text-lg font-medium text-white">{cast?.character}</h2>
            </div>
        </div>
    );
};

export default CastCard;
