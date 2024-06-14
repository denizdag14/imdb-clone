'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import Card from "./Card";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

export default function Results({results, genre, total_pages, currentPage}) {

  const getPaginationLinks = (isMobile) => {
    const links = [];
    const maxPageLinks = isMobile ? 3 : 5;
    let startPage = Math.max(currentPage - Math.floor(maxPageLinks / 2), 1);
    let endPage = startPage + maxPageLinks - 1;

    if (endPage > numberOfPages) {
        endPage = numberOfPages;
        startPage = Math.max(endPage - maxPageLinks + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        links.push(
            <Link key={i} href={`/?genre=${genre}&page=${i}`}>
                <span className={`cursor-pointer px-3 py-1 rounded ${currentPage === i ? 'bg-yellow-500 text-slate-600' : 'text-yellow-500'}`}>
                    {i}
                </span>
            </Link>
        );
    }
    
    return links;
  };

  const numberOfPages = total_pages
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4">
        {
            results.map((result) => (
              <>
                <Card genre={genre} key={result.id} result={result} />
              </>
            ))
        }
      </div>

      <div className='w-full justify-center flex flex-row items-center pb-5'>
        <div className='flex flex-row items-center gap-4'>

          {/* Go to First Page */}
          {currentPage !== 1 ? (
            <Link href={`/?genre=${genre}&page=1`}>
              <span className='text-yellow-500 cursor-pointer font-semibold'><FaAngleDoubleLeft /></span>
            </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-400 font-semibold"><FaAngleDoubleLeft /></span>
          )}
          

          {/* Previous Page Link */}
          {currentPage > 1 ? (
              <Link href={`/?genre=${genre}&page=${currentPage - 1}`}>
                  <span className=' text-yellow-500 cursor-pointer font-semibold' onClick={() => prevPage()}><FaAngleLeft /></span>
              </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-400 font-semibold"><FaAngleLeft /></span>
          )}

          {/* Page Numbers */}
          <div className="hidden sm:flex">
            {getPaginationLinks(false)}
          </div>
          <div className="flex sm:hidden">
            {getPaginationLinks(true)}
          </div>

          {/* Next Page Link */}
          {currentPage < numberOfPages ? (
              <Link href={`/?genre=${genre}&page=${currentPage + 1}`}>
                  <span className='text-yellow-500 cursor-pointer font-semibold' onClick={() => nextPage()}><FaAngleRight /></span>
              </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-400 font-semibold"><FaAngleRight /></span>
          )}

          {/* Go to Last Page */}
          {currentPage !== numberOfPages ? (
            <Link href={`/?genre=${genre}&page=${numberOfPages}`}>
              <span className='text-yellow-500 cursor-pointer font-semibold'><FaAngleDoubleRight /></span>
            </Link>
          ) : (
            <span className="cursor-not-allowed text-gray-400 font-semibold"><FaAngleDoubleRight /></span>
          )}
          
        </div>
      </div>
    </>
  )

  function nextPage(){
    if (currentPage != numberOfPages){
        currentPage++;
    }
  }
  
  function prevPage(){
    if (currentPage != 1){
      currentPage--;
    }
  }

}