import Results from "@/components/Results"

const API_KEY = process.env.API_KEY;

export default async function Home({searchParams}) {

  let endpoint;
  const currentPage = parseInt(searchParams.page) || 1;
  const genre = searchParams.genre || 'fetchTrending';
  const today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;
  let nextMonth = (parseInt(month) + 1).toString().padStart(2, '0');
  let nextYear;
  if(nextMonth === '13'){
    nextMonth = '1';
    nextYear = (parseInt(year) + 1).toString();
  }
  const nextMonthDate = `${nextYear? nextYear : year}-${nextMonth}-${day}`;

  switch (genre) {
      case 'fetchTrending':
          endpoint = '/trending/all/week';
          break;
      case 'fetchTrendingPerson':
          endpoint = '/trending/person/week';
          break;
      case 'fetchTopRatedMovie':
          endpoint = '/movie/top_rated';
          break;
      case 'fetchTopRatedTvSeries':
          endpoint = '/tv/top_rated';
          break;
      case 'fetchUpcomingMovie':
          endpoint = '/discover/movie';
          break;
      case 'fetchUpcomingTvSeries':
          endpoint = '/discover/tv';
          break;
      default:
          throw new Error('Invalid genre');
  }

  let url;
  if (endpoint === '/discover/movie') {
    url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}&primary_release_date.gte=` + todayDate + `&primary_release_date.lte=` + nextMonthDate + `&sort_by=primary_release_date.asc`;
  } else if(endpoint === '/discover/tv'){
    url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}&first_air_date.gte=` + todayDate + `&first_air_date.lte=` + nextMonthDate + `&sort_by=first_air_date.asc`;
  } else if(endpoint === '/trending/all/week'){
    url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}&media_type=movie,tv`;
  } else {
    url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  }

  const response = await fetch(
    url,
    { next: { revalidate: 10000 } }
  );
  const data = await response.json();
  if(!response.ok){
    throw new Error('Failed to fetch data')
  };
  const results = data.results;
  const total_pages = (genre === 'fetchTrending' || genre === 'fetchTrendingPerson') ? 500 : data.total_pages;

  return (
    <div>
      <Results results={results} genre={genre} total_pages={total_pages} currentPage={currentPage} />
    </div>
  )
}