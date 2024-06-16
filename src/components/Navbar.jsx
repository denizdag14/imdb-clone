'use client';

import { Suspense } from "react";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="flex dark:text-white text-black dark:bg-gray-600 bg-yellow-200 p-4 lg:text-lg justify-center gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <div className={`relative group flex justify-center`}>
              <p className={`hover:text-amber-600 font-light sm:font-semibold text-xs sm:text-lg `}>Trending</p>
              <div className={`hidden group-hover:flex flex-col absolute top-full bg-yellow-200 dark:bg-gray-600 rounded-b-md shadow-lg w-32 border-amber-600 border-b border-l border-r`}>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Movies & Tv" param="fetchTrending" />
                </div>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Person" param="fetchTrendingPerson" />
                </div>
              </div>
            </div>
            <div className={`relative group flex justify-center`}>
              <p className={`hover:text-amber-600 font-light sm:font-semibold text-xs sm:text-lg `}>Top Rated</p>
              <div className={`hidden group-hover:flex flex-col absolute top-full bg-yellow-200 dark:bg-gray-600 rounded-b-md shadow-lg w-28 border-amber-600 border-b border-l border-r`}>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Movies" param="fetchTopRatedMovie" />
                </div>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Tv Series" param="fetchTopRatedTvSeries" />
                </div>
              </div>
            </div>
            <div className={`relative group flex justify-center`}>
              <p className={`hover:text-amber-600 font-light sm:font-semibold text-xs sm:text-lg`}>Upcoming</p>
              <div className={`hidden group-hover:flex flex-col absolute top-full bg-yellow-200 dark:bg-gray-600 rounded-b-md shadow-lg w-28 border-amber-600 border-b border-l border-r`}>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Movies" param="fetchUpcomingMovie" />
                </div>
                <div className="hover:bg-yellow-300 dark:hover:bg-gray-500 p-2 text-center">
                  <NavbarItem title="Tv Series" param="fetchUpcomingTvSeries" />
                </div>
              </div>
            </div>
          </Suspense>
    </div>
  )
}
