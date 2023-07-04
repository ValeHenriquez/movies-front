'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

interface Props { }

export const BackButton: React.FC<Props> = ({ }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <button className="flex items-center justify-center w-32 h-10 text-white transition duration-300 ease-in-out bg-red-500 rounded hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg "
      onClick={handleBack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#ffffff"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="ml-2">Back</span>

    </button>
  )
}