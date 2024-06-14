import Image from 'next/image';
import Link from 'next/link';
import { FaRegCalendarAlt, FaStar, FaUser } from 'react-icons/fa';

export default async function SeriesPage({params}) {
    const seriesId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits`
    );
    const series = await response.json();
    const leadingRoles = series.credits.cast.slice(0, 9);
    console.log(series)
  return (
    <div className="w-full">
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            <Image
                src={`https://image.tmdb.org/t/p/original/${series.poster_path || series.backdrop_path}`}
                width={500} height={300}
                className='rounded-lg shadow-2xl'
                alt=''
                style={{maxWidth: '100%', height: '100%'}}
            />
            <div className='p-2'>
                <h2 className='text-lg text-center uppercase mb-3 font-bold border-b dark:border-white border-b-black text-yellow-500'>{series.title || series.name}</h2>
                <p className='text-lg mb-3'>{series.overview}</p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaRegCalendarAlt  className="h-5 mr-2" />Date Released:</span>
                    {series.release_date || series.first_air_date}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaStar className="h-5 mr-2" />Rating:</span>
                    {series.vote_count}
                </p>
                <div className='mb-3 flex justify-center'>
                    <span className='font-semibold mr-1 flex text-yellow-500'><FaUser className="h-5 mr-2" />Cast:</span>
                </div>
                <div className='mb-3 flex flex-wrap'>
                    {leadingRoles.map(actor => (
                        <Link href="" key={actor.cast_id} className="shadow-2xl rounded-lg p-2 m-2 flex flex-col items-center w-44 dark:hover:bg-slate-800 hover:bg-slate-200">
                            <div className='text-yellow-600 text-sm font-bold border-b border-slate-500 w-full text-center pb-1'>{actor.character}</div>
                            <div className='text-sm dark:text-white mt-2'>{actor.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}