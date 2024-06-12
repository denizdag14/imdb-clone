import Results from "@/components/Results"

const API_KEY = process.env.API_KEY;

export default async function Home({searchParams}) {

  let endpoint;
  const genre = searchParams.genre || 'fetchTrending';
  switch (genre) {
      case 'fetchTrending':
          endpoint = '/trending/all/week';
          break;
      case 'fetchTopRatedMovie':
          endpoint = '/movie/top_rated';
          break;
      case 'fetchTopRatedTvSeries':
          endpoint = '/tv/top_rated';
          break;
      default:
          throw new Error('Invalid genre');
  }
  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  const data = await response.json();
  if(!response.ok){
    throw new Error('Failed to fetch data')
  };
  const results = data.results;
  return (
    <div>
      <Results results={results} genre={genre} />
    </div>
  )
}
