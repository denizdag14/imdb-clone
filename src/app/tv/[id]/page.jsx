import Image from 'next/image';
import Link from 'next/link';
import { FaRegCalendarAlt, FaStar, FaUser, FaInfoCircle } from 'react-icons/fa';

export default async function SeriesPage({params}) {
    const seriesId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits`
    );
    const series = await response.json();
    const leadingRoles = series.credits.cast.slice(0, 9);
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
                <p className='text-lg mb-3'>{series.overview}</p>
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
                <p className="mb-3 flex">
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'>
                        <FaInfoCircle className="h-5 mr-2" />Status: 
                    </span> {series.status}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaStar className="h-5 mr-2" />Rating:</span>
                    {Math.round(series.vote_average * 10) / 10}
                </p>
                <div className='mb-3 flex justify-center'>
                    <span className='font-semibold mr-1 flex text-yellow-500'><FaUser className="h-5 mr-2" />Cast:</span>
                </div>
                <div className='mb-3 flex flex-wrap'>
                    {leadingRoles.map(person => (
                        <Link href={`/person/${person.id}`} key={person.cast_id} className="shadow-2xl rounded-lg m-2 flex flex-col items-center w-28 dark:hover:bg-slate-800 hover:bg-slate-200">
                            <Image className="rounded-t-lg mb-2" src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} width={500} height={500} alt=""></Image>
                            <div className='text-yellow-600 text-sm font-bold border-b border-slate-500 w-full text-center pb-1'>{person.character}</div>
                            <div className='text-sm text-center dark:text-white m-2'>{person.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}