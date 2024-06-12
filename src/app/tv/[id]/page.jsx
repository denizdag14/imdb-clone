import Image from 'next/image';

export default async function SeriesPage({params}) {
    const seriesId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.API_KEY}`
    );
    const series = await response.json();
  return (
    <div className="w-full">
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            
            <Image
                src={`https://image.tmdb.org/t/p/original/${series.backdrop_path || series.poster_path}`}
                width={500} height={300}
                className='rounded-lg'
                alt=''
                style={{maxWidth: '100%', height: '100%'}}
            >
            </Image>
            <div className='p-2'>
                <h2 className='text-lg mb-3 font-bold'>{series.title || series.name}</h2>
                <p className='text-lg mb-3'>{series.overview}</p>
                <p className='mb-3'>
                    <span className='font-semibold mr-1'>Date Released:</span>
                    {series.release_date || series.first_air_date}
                </p>
                <p className='mb-3'>
                    <span className='font-semibold mr-1'>Rating:</span>
                    {series.vote_count}
                </p>
            </div>
        </div>
    </div>
  )
}