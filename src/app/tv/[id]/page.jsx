import Image from 'next/image';
import Link from 'next/link';
import { FaRegCalendarAlt, FaStar, FaUser, FaInfoCircle, FaListUl, FaTv, FaFlag, FaListOl, FaFilm, FaImdb } from 'react-icons/fa';

export default async function SeriesPage({params}) {
    const seriesId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits,external_ids`
    );
    const series = await response.json();
    const sortedCast = series.credits.cast.sort((a, b) => b.popularity - a.popularity);
    const sortedCrew = series.credits.crew.sort((a, b) => b.popularity - a.popularity);
    const imageUrl = series.poster_path 
        ? `https://image.tmdb.org/t/p/original/${series.poster_path}`
        : series.backdrop_path 
            ? `https://image.tmdb.org/t/p/original/${series.backdrop_path}`
            : "/no_image_available.jpg";
  return (
    <div className="w-full">
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            <Image
                src={imageUrl}
                width={500} height={300}
                className='rounded-lg shadow-2xl'
                alt=''
                style={{maxWidth: '100%', height: '100%'}}
            />
            <div className='p-2'>
                <h2 className='text-lg text-center uppercase mb-3 font-bold border-b dark:border-white border-b-black text-yellow-500'>{series.title || series.name}</h2>
                <p className="text-center italic mb-2">{series.tagline !== "" && ('\'' + series.tagline + '\'')}</p>
                <p className='text-sm md:text-base lg:text-lg mb-3' style={{ textAlign: 'justify' }}>{series.overview}</p>
                <p className='mb-3 flex'>
                    {series.status !== 'In Production' && (
                        <>
                            <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                                <FaRegCalendarAlt className="h-5 mr-2" />Date Released:
                            </span>
                            {series.release_date || series.first_air_date} 
                        </>
                    )}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaFilm className="h-5 mr-2" />Genres:</span>
                    {series.genres.map((genre, index) => (
                    <span key={index}>
                        {index > 0 && ', '}
                        {genre.name}
                    </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                        <FaListUl className="h-5 mr-2" />Seasons: 
                    </span> {series.number_of_seasons}
                </p><p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                        <FaListOl className="h-5 mr-2" />Episodes: 
                    </span> {series.number_of_episodes}
                </p>
                <p className="mb-3 flex">
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                        <FaInfoCircle className="h-5 mr-2" />Status: 
                    </span> {series.status}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaStar className="h-5 mr-2" />Rating:</span>
                    {Math.round(series.vote_average * 10) / 10}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaFlag className="h-5 mr-2" />Origin Country:</span>
                    {series.production_countries.map((country, index) => (
                    <span key={index} className="network-item flex items-center mr-2">
                        {series.origin_country.toString() === country.iso_3166_1.toString() && (
                            <span className="">{country.name}</span>
                        )}
                    </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaTv className="h-5 mr-2" />Network:</span>
                    {series.networks.map(network => (
                        <span key={network.id} className="network-item flex items-center mr-2">
                        {network.logo_path ? (
                            <Image
                            src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                            alt={network.name}
                            width={50}
                            height={50}
                            />
                        ) : (
                            <span>{network.name}</span>
                        )}
                        </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <Link target="_blank" rel="noopener noreferrer" className='font-semibold mr-1 flex items-center text-yellow-500' href={'https://www.imdb.com/title/' + series.external_ids.imdb_id}><FaImdb className="h-5 mr-2" />IMDb link</Link>
                </p>
            </div>
        </div>
        <div className='mb-3 flex justify-center'>
            <span className='font-semibold mr-1 flex text-yellow-500'><FaUser className="h-5 mr-2" />Cast:</span>
        </div>
        <div className='mb-3 flex'>
            <div className='flex-1'>
                <span className='font-semibold mr-1 flex text-yellow-500 justify-center'><FaUser className="h-5 mr-2" />Cast:</span>
                <div className='flex flex-wrap justify-center'>
                    {sortedCast.map(person => (
                        <Link href={`/person/${person.id}`} key={person.cast_id} className="rounded-2xl hover:dark:bg-zinc-800 shadow-2xl m-2 flex flex-col items-center w-28 transition-transform transform duration-200 hover:scale-105 hover:bg-gray-100">
                            <Image className="rounded-t-lg mb-2" src={person.profile_path ? `https://image.tmdb.org/t/p/original/${person.profile_path}` : "/no_image_available.jpg"} width={500} height={500} alt=""></Image>
                            <div className='text-yellow-600 text-sm font-bold border-b border-slate-500 w-full text-center pb-1'>{person.character ? <><span className="text-sm dark:text-white text-black font-light">as</span> {person.character}</> : '-'}</div>
                            <div className='text-sm text-center dark:text-white m-2'>{person.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex-1'>
                <span className='font-semibold mr-1 flex text-yellow-500 justify-center'><FaUser className="h-5 mr-2" />Crew:</span>
                <div className='flex flex-wrap justify-center'>
                    {sortedCrew.map(person => (
                        <Link href={`/person/${person.id}`} key={person.crew_id} className="rounded-2xl hover:dark:bg-zinc-800 shadow-2xl m-2 flex flex-col items-center w-28 transition-transform transform duration-200 hover:scale-105 hover:bg-gray-100">
                            <Image className="rounded-t-lg mb-2" src={person.profile_path ? `https://image.tmdb.org/t/p/original/${person.profile_path}` : "/no_image_available.jpg"} width={500} height={500} alt=""></Image>
                            <div className='text-yellow-600 text-sm font-bold border-b border-slate-500 w-full text-center pb-1'>{person.job ? <>{person.job}</> : '-'}</div>
                            <div className='text-sm text-center dark:text-white m-2'>{person.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}