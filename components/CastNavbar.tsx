import React from 'react'
import { BackButton } from './common';

interface Props {
  title: string;
}

export const CastNavbar: React.FC<Props> = ({ title }) => {

  return (
    <>
      <div className="w-full text-white bg-[#0c0c0c] h-20">
        <div className="flex items-center justify-between w-1/2 px-4 py-2 mx-auto">
          <BackButton />
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">{title}</h1>
          </div>
        </div>
      </div>

    </>
  )
}
