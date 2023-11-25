import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.js';
import { Link } from 'react-router-dom';

const API_KEY = '3526b9ce0b4f114f3e81c7c6d29dfde2';
const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

function MovieCard({ id, title, posterPath }: { id: number; title: string; posterPath: string }): JSX.Element {
  return (
    <Link to={`/movie/${id}`} className="block mb-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <img src={`${IMAGE_BASE_URL}${posterPath}`} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-xl font-semibold mb-2">{title}</p>
        </div>
      </div>
    </Link>
  );
}

function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const isLoading = useRef(false);

  const loadMoreMovies = async (): Promise<void> => {
    if (isLoading.current) return;

    isLoading.current = true;

    try {
      const response = await fetch(
        `${API_URL}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      isLoading.current = false;
    }
  };

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${API_URL}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
        setPage(2);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
