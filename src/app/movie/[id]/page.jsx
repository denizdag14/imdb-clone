import Image from 'next/image';
import Link from 'next/link';
import { FaRegCalendarAlt, FaStar, FaDollarSign, FaUser, FaInfoCircle, FaFilm, FaFlag, FaImdb } from 'react-icons/fa';

export default async function MoviePage({params}) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    const movieId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits`
    );
    const movie = await response.json();
    const sortedCast = movie.credits.cast.sort((a, b) => b.popularity - a.popularity);
    const sortedCrew = movie.credits.crew.sort((a, b) => b.popularity - a.popularity);
    let producers = movie.credits.crew.filter(crewMember => crewMember.job === 'Executive Producer');
    if (producers.length === 0) {
      producers = movie.credits.crew.filter(crewMember => crewMember.job === 'Producer');
    }
    const directors = movie.credits.crew.filter(crewMember => crewMember.job === 'Director');
    const writers = movie.credits.crew.filter(crewMember => crewMember.job === 'Novel' || crewMember.job === 'Story' || crewMember.job === 'Writer');
    const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        : movie.backdrop_path 
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : "/no_image_available.jpg";
  return (
    <div className="w-full">
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            
            <Image
                src={imageUrl}
                width={500} height={300}
                className='rounded-lg'
                alt="no image found"
                style={{maxWidth: '100%', height: '100%'}}
            >
            </Image>
            <div className='p-2'>
                <h2 className='text-lg text-center uppercase mb-3 font-bold border-b dark:border-white border-b-black text-yellow-500'>{movie.title || movie.name}</h2>
                <p className="text-center italic mb-2">{movie.tagline !== "" && ('\'' + movie.tagline + '\'')}</p>
                <p className='text-lg mb-3' style={{ textAlign: 'justify' }}>{movie.overview}</p>
                <p className='mb-3 flex'>
                    {movie.status !== 'In Production' && (
                        <>
                            <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                                <FaRegCalendarAlt className="h-5 mr-2" />Date Released:
                            </span>
                            {movie.release_date || movie.first_air_date} 
                        </>
                    )}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                    <FaInfoCircle className="h-5 mr-2" />Producer: 
                    </span>
                    {producers.map((crewMember, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            <Link className='hover:text-yellow-500' href={'/person/' + crewMember.id}>{crewMember.name}</Link>
                        </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                    <FaInfoCircle className="h-5 mr-2" />Director: 
                    </span> {directors.map((crewMember, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            <Link className='hover:text-yellow-500' href={'/person/' + crewMember.id}>{crewMember.name}</Link>
                        </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                    <FaInfoCircle className="h-5 mr-2" />Writer: 
                    </span>
                    {writers.map((crewMember, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            <Link className='hover:text-yellow-500' href={'/person/' + crewMember.id}>{crewMember.name}</Link>
                        </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaFilm className="h-5 mr-2" />Genres:</span>
                    {movie.genres.map((genre, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            {genre.name}
                        </span>
                    ))}
                </p>
                <p className="mb-3 flex">
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                    <FaInfoCircle className="h-5 mr-2" />Runtime: 
                    </span> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </p>
                <p className="mb-3 flex">
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                    <FaInfoCircle className="h-5 mr-2" />Status: 
                    </span> {movie.status}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaStar className="h-5 mr-2" />Rating:</span>
                    {Math.round(movie.vote_average * 10) / 10}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaFlag className="h-5 mr-2" />Origin Country:</span>
                    {movie.production_countries.map((country, index) => (
                    <span key={index} className="network-item flex items-center mr-2">
                        {movie.origin_country.toString() === country.iso_3166_1.toString() && (
                            <span className="">{country.name}</span>
                        )}
                    </span>
                    ))}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-green-500'><FaDollarSign className="h-5 mr-2" /> Budget:</span>
                    {formatter.format(movie.budget)}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-green-500'><FaDollarSign className="h-5 mr-2" /> Revenue:</span>
                    {formatter.format(movie.revenue)}
                </p>
                <p className='mb-3 flex'>
                    <Link target="_blank" rel="noopener noreferrer" className='font-semibold mr-1 flex items-center text-yellow-500' href={'https://www.imdb.com/title/' + movie.imdb_id}><FaImdb className="h-5 mr-2" />IMDb link</Link>
                </p>
            </div>
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
