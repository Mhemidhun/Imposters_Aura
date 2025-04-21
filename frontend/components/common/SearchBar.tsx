


import React from 'react'

export interface ISearch{
  search : string;
  setSearch : (data:string)=>void;
}

const SearchBar = ({search,setSearch}:ISearch) => {
  return (
    <>
       <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 rounded-md bg-[#1f2a40] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500"
          />
    </>
  )
}

export default SearchBar