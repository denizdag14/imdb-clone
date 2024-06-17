import Image from "next/image";
import { FaBriefcase, FaTv, FaTransgender, FaBirthdayCake, FaMapMarked, FaCross  } from 'react-icons/fa';
import PersonJobCard from "@/components/PersonJobCard"

function calculateAge(birthdayString, deathdayString) {
    const today = new Date();
    const birthday = new Date(birthdayString);
    let age;
    if (deathdayString !== "" && deathdayString !== null) {
        const deathday = new Date(deathdayString);
        age = deathday.getFullYear() - birthday.getFullYear();
    } else {
        // Ölüm tarihi bilgisi yoksa veya boşsa
        age = today.getFullYear() - birthday.getFullYear();
        const monthDifference = today.getMonth() - birthday.getMonth();
        const dayDifference = today.getDate() - birthday.getDate();
    
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
    }

    return age;
}

export default async function PersonPage({params}) {

    const personId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`
    );
    const person = await response.json();
    const movies = person.known_for_department === 'Acting' ? person.movie_credits.cast : person.movie_credits.crew;
    movies.sort((a, b) => b.popularity - a.popularity); //Sort movies by their popularity
    const uniqueMovieIds = Array.from(new Set(movies.map(show => show.id)));
    // const movieList = uniqueMovieIds.map(id => movies.find(show => show.id === id));
    const movieList = person.known_for_department !== 'Acting' ? uniqueMovieIds.map(id => {
        const groupedMovies = movies.filter(movie => movie.id === id);
        const combinedJobs = groupedMovies.map(movie => movie.department).join(', ');
        const firstMovie = groupedMovies[0];
        firstMovie.job = combinedJobs;
        return firstMovie;
      }) : movies;
    const tv = person.known_for_department === 'Acting' ? person.tv_credits.cast : person.tv_credits.crew;
    tv.sort((a, b) => b.episode_count - a.episode_count); //Sort tv series by person's episode count
    const uniqueTvShowIds = Array.from(new Set(tv.map(show => show.id)));
    const tvShowList = person.known_for_department !== 'Acting' ? uniqueTvShowIds.map(id => {
        const groupedTvSeries = tv.filter(series => series.id === id);
        const combinedJobs = groupedTvSeries.map(series => series.department).join(', ');
        const firstTv = groupedTvSeries[0];
        firstTv.job = combinedJobs;
        return firstTv;
      }) : tv;
  return (
    <>
        <div className="w-full">
            <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
                <Image
                    src={person.profile_path ? `https://image.tmdb.org/t/p/original/${person.profile_path}` : "/no_image_available.jpg"}
                    width={500} height={300}
                    className='rounded-lg shadow-2xl w-60 self-center'
                    alt=''
                    style={{maxWidth: '100%', height: '100%'}}
                />
                <div className='p-2'>
                    <h2 className='text-lg text-center uppercase mb-3 font-bold border-b dark:border-white border-b-black text-yellow-500'>{person.name}</h2>
                    <div className='text-sm mb-3' style={{ textAlign: 'justify' }}>
                        {person.biography.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-2"><span className=''></span>{paragraph}</p>
                        ))}
                    </div>
                    <p className='mb-3 flex'>
                        <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaBriefcase  className="h-5 mr-2" />Known job:</span>
                        {person.known_for_department}
                    </p>
                    <p className='mb-3 flex'>
                        <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaMapMarked  className="h-5 mr-2" />Place of birth:</span>
                        {person.place_of_birth}
                    </p>
                    {person.deathday ? (
                        <>
                            <p className="mb-3 flex">
                                <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaBirthdayCake  className="h-5 mr-2" />Birthday:</span>
                                {person.birthday}
                            </p>
                            <p className="flex">
                                <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaCross  className="h-5 mr-2" />Deathday:</span>
                                {person.deathday} (at the age of {(calculateAge(person.birthday, person.deathday))})
                            </p>    
                        </>
                    ) : (
                        <>
                            <p className="mb-3 flex">
                                <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaBirthdayCake  className="h-5 mr-2" />Birthday:</span>
                                {person.birthday} ({calculateAge(person.birthday, person.deathday)} years old)
                            </p>
                        </>
                    )}
                    <p className='mb-3 flex'>
                        <span className='font-semibold mr-1 flex items-center text-yellow-500'><FaTransgender  className="h-5 mr-2" />Gender:</span>
                        {person.gender === 1 ? 'Female' : (person.gender === 2 ? 'Male' : 'Non-binary')}
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
                    {movieList.map(movie => (
                        <div key={movie.id} className="rounded-lg m-2 items-center w-44">
                            <PersonJobCard genre='movie' key={movie.id} result={movie}/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Diziler */}
            <div className='flex-1'>
                <h2 className='text-center font-bold'>TV Series & Shows</h2>
                <div className='flex flex-wrap justify-center'>
                    {tvShowList.map(tvShow => (
                        <div key={tvShow.id} className="rounded-lg m-2 items-center w-44">
                            <PersonJobCard genre='tv' key={tvShow.id} result={tvShow} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
