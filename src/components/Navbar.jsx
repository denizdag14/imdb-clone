'use client';

import { Suspense } from "react";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="flex dark:text-white text-black dark:bg-gray-600 bg-yellow-200 p-4 lg:text-lg justify-center gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <NavbarItem title="Trending" param="fetchTrending"/>
            <NavbarItem title="Top Rated Movies" param="fetchTopRatedMovie" />
            <NavbarItem title="Top Rated Tv Series & Shows" param="fetchTopRatedTvSeries" />
          </Suspense>
    </div>
  )
}
