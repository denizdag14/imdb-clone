import Results from "@/components/Results";

export default async function SearchPage({params}) {
    const searchTerm = params.searchTerm;
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=true`);
    const data = await response.json();
    const result = data.results;
  return (
    <div>
        {
            result && result.length === (<h1 className="text-center pt-6">No results found</h1>)
        }
        {
            result && <Results results={result}/>
        }
    </div>
  )
}
