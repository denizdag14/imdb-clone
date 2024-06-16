import Link from "next/link";
import Image from "next/image";
import { FaStar, FaBriefcase } from "react-icons/fa";

export default function PersonPageCard({result, genre}) {
    let mediaType;
    switch (genre) {
        case 'fetchTrending':
            mediaType = '/trending/all/week';
            break;
        case 'fetchTopRatedMovie':
            mediaType = 'movie';
            break;
        case 'fetchTopRatedTvSeries':
            mediaType = 'tv';
            break;
        case 'movie':
            mediaType = 'movie';
            break;
        case 'tv':
            mediaType = 'tv';
            break;
    }
    // const imageUrl = result.profile_path 
    //     ? `https://image.tmdb.org/t/p/original/${result.profile_path}`
    //         : "/no_image_available.jpg";
  return (
    <div className="group cursor-pointer hover:shadow-slate-400 shadow-lg rounded-lg sm:border-slate-400 m-6 sm:m-6 md:m-4 lg:m-2 mb-14 transition-shadow duration-200">
        <Link href= {result.media_type ? `/${result.media_type}/${result.id}` : `/${mediaType}/${result.id}`}>
            <Image 
                src={result.profile_path 
                    ? `https://image.tmdb.org/t/p/original/${result.profile_path}`
                        : "/no_image_available.jpg"}
                width={500} height={300}
                className="rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" 
                alt="">
            </Image>
            <div className="p-2">
                <h2 className="text-lg text-center text-yellow-500 font-bold truncate">{result.title || result.name}</h2>
                <hr className="my-2 border-slate-400"/>
                <p className="line-clamp-2 text-md text-center">{result.known_for_department}</p>
            </div>
        </Link>
    </div>
  )
}
