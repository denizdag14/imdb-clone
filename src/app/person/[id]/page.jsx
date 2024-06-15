import Image from "next/image";
import PersonPageCard from "@/components/Card";
import { FaRegCalendarAlt, FaStar, FaTv } from 'react-icons/fa';

export default async function PersonPage({params}) {
    const personId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`
    );
    const person = await response.json();
    const movies = person.movie_credits.cast;
    const tv = person.tv_credits.cast;
    const uniqueTvShowIds = Array.from(new Set(tv.map(show => show.id)));
    const tvShowList = uniqueTvShowIds.map(id => tv.find(show => show.id === id));
  return (
    <>
        <div className="w-full">
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            <Image
                src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                width={500} height={300}
                className='rounded-lg shadow-2xl'
                alt=''
                style={{maxWidth: '100%', height: '100%'}}
            />
            <div className='p-2'>
                <h2 className='text-lg text-center uppercase mb-3 font-bold border-b dark:border-white border-b-black text-yellow-500'>{person.name}</h2>
                <p className='text-md mb-3'>{person.biography}</p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaRegCalendarAlt  className="h-5 mr-2" />Birthday:</span>
                    {person.birthday}
                </p>
                <p className='mb-3 flex'>
                    <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaStar className="h-5 mr-2" />Popularity:</span>
                    {person.popularity}
                </p>
            </div>
        </div>
    </div>
    <div className='mb-3 flex justify-center'>
        <span className='font-semibold mr-1 flex text-yellow-500'><FaTv className="h-5 mr-2" />Jobs:</span>
    </div>
    <div className='mb-3 flex'>
        {/* Filmler */}
        <div className='flex-1'>
            <h2 className='text-center font-bold'>Movies</h2>
            <div className='flex flex-wrap justify-center'>
                {movies.map(movie => (
                    <div key={movie.id} className="rounded-lg p-2 m-2 items-center w-44">
                        <PersonPageCard genre='movie' key={movie.id} result={movie}/>
                    </div>
                ))}
            </div>
        </div>

        {/* Diziler */}
        <div className='flex-1'>
            <h2 className='text-center font-bold'>TV Series & Shows</h2>
            <div className='flex flex-wrap justify-center'>
                {tvShowList.map(tvShow => (
                    <div key={tvShow.id} className="rounded-lg p-2 m-2 items-center w-44">
                        <PersonPageCard genre='tv' key={tvShow.id} result={tvShow} />
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}
