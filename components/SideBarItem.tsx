import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ListBulletIcon,
  FilmIcon
} from "@heroicons/react/24/solid";

import React from 'react'
import Link from "next/link";

interface Props {
  description: string;
  href: string;
}

export const SideBarItem: React.FC<Props> = ({ description, href }) => {

  const getIcon = (description: string) => {
    switch (description) {
      case "Profile":
        return <UserCircleIcon className="w-5 h-5 mr-2" />
      case "Playlists":
        return <ListBulletIcon className="w-5 h-5 mr-2" />
      case "Movies":
        return <FilmIcon className="w-5 h-5 mr-2" />
      default:
        return <UserCircleIcon className="w-5 h-5 mr-2" />
    }
  }
  return (
    <>
      <ListItem
        className="flex items-center justify-start w-full h-20 px-4 py-2 text-white rounded-lg hover:bg-slate-700 hover:text-white hover:shadow-xl"
      >
        <ListItemPrefix>
          {getIcon(description)}
        </ListItemPrefix>
        <Link href={href}>
          <Typography color="blue-gray" className="mr-auto font-normal" variant="h5">
            {description}
          </Typography>
        </Link>
      </ListItem>
    </>
  )
}
