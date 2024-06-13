"use client"

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function SearchBox() {
    const [search, setSearch] = useState('');
    const router = useRouter()
    const handleSubmit = (e) => {
      e.preventDefault();
      router.push(`/search/${search}`);
      setSearch("");
    };
  return (
    <form className='flex justify-between px-5 max-w-4xl mx-auto pt-4' onSubmit={handleSubmit}>
        <input type="text" placeholder="Search keyword..." 
        className="w-full h-11 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}/>
        <button className="bg-yellow-400 rounded-md py-1 px-2 text-black dark:disabled:bg-gray-400 h-11 disabled:bg-yellow-200" disabled={search === ""} >Search</button>
    </form>
  )
}
