'use client';

import { Suspense } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'

export default function Navbar() {
  return (
    <div className="flex text-black dark:bg-yellow-500 bg-yellow-200 p-4 lg:text-lg justify-center gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <Popover>
              <PopoverButton>
                Trending
              </PopoverButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  anchor="bottom"
                  className="rounded-xl dark:bg-neutral-900 bg-yellow-200 text-sm"
                >
                  <div className="p-3">
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchTrending">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">Movies & Tv Series</p>
                      <p className="text-gray-400 dark:text-gray-200">Trending movies and tv series</p>
                    </a>
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchTrendingPerson">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">People</p>
                      <p className="text-gray-400 dark:text-gray-200">Trending people</p>
                    </a>
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
            
            <Popover>
              <PopoverButton>
                Top Rated
              </PopoverButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  anchor="bottom"
                  className="rounded-xl dark:bg-neutral-900 bg-yellow-200 text-sm"
                >
                  <div className="p-3">
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchTopRatedMovie">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">Movies</p>
                      <p className="text-gray-400 dark:text-gray-200">Top rated movies</p>
                    </a>
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchTopRatedTvSeries">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">Tv Series & Shows</p>
                      <p className="text-gray-400 dark:text-gray-200">Top rated tv series and shows</p>
                    </a>
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>

            <Popover>
              <PopoverButton>
                Upcoming
              </PopoverButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  anchor="bottom"
                  className="rounded-xl dark:bg-neutral-900 bg-yellow-200 text-sm"
                >
                  <div className="p-3">
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchUpcomingMovie">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">Movies</p>
                      <p className="text-gray-400 dark:text-gray-200">Upcoming movies</p>
                    </a>
                    <a className="block rounded-lg py-2 px-3 transition dark:hover:bg-zinc-800 hover:bg-yellow-400" href="/?genre=fetchUpcomingTvSeries">
                      <p className="font-semibold dark:text-yellow-500 text-gray-800">Tv Series & Shows</p>
                      <p className="text-gray-400 dark:text-gray-200">Upcoming tv series and shows</p>
                    </a>
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
          </Suspense>
    </div>
  )
}
