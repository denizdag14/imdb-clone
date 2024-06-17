import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function About() {
  return (
    <>
        <div className="max-w-6xl mx-auto p-3 space-y-4" style={{ textAlign: 'justify' }}>
            <h1 className="text-2xl font-medium text-amber-600">About</h1>
            <p>
                Welcome to our film/TV series database site!
            </p>
            <p>
                Our site is designed to offer a comprehensive database of movies from around the world.
                Our movie database is constantly updated with new releases, so you can access the latest and greatest productions in the cinema world.
                You can search for movies/TV series by title, director, or actor, making it easy to find the perfect movie/TV series for any occasion.
            </p>
            <p>
                Thank you for visiting our site, and we hope you have an enjoyable time browsing our film/TV series database.
                If you have any feedback or suggestions, please do not hesitate to contact us.
                We are always looking for ways to enhance and improve the user experience. Happy browsing!
            </p>
        </div>
        <div className="flex justify-center mt-2">
            <span>Made by</span>
            <Link legacyBehavior href="https://github.com/denizdag14" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaGithub className="text-white mr-1" />denizdag</a>
            </Link>
            <Link legacyBehavior href="https://www.instagram.com/denizdag" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-white mr-1" />denizdag</a>
            </Link>
            <Link legacyBehavior href="https://www.linkedin.com/in/denizdag14/" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-white mr-1" />denizdag</a>
            </Link>
        </div>
    </>
  )
}
