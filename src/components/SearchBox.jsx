"use client"

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import { Button } from '@headlessui/react'

export default function SearchBox() {
    const [search, setSearch] = useState('');
    const router = useRouter()
    const handleSubmit = (e) => {
      e.preventDefault();
      router.push(`/search/${search}`);
      setSearch("");
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          handleSubmit(e);
      }
    };
  return (
    <div className='flex justify-between px-5 max-w-4xl mx-auto pt-4'>
        <input type="text" placeholder="Search keyword..." 
        className="w-full h-11 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}/>
        <Button onClick={handleSubmit} className="bg-yellow-400 rounded-2xl py-1 px-2 text-black dark:disabled:bg-gray-400 h-11 disabled:bg-yellow-200 inline-flex items-center gap-2 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-yellow-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" disabled={search === ""} >Search</Button>
    </div>
  )
}
