import { useEffect, useRef, useState } from 'react';
import Rating from './RatingComponent/Rating';

console.time('start');

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(function () {
    console.log(inputEl.current);
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="search movies..."
      onKeyDown={(e) => setQuery(e.key === 'Enter' ? e.target.value : query)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

// USE EFFECT WITH NORMAL PROMISING METHOD
/*
useEffect(function () {
    fetch(`http://www.omdbapi.com/?apikey=${api_key}&${search}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }); 
*/

// const api_key = 'http://www.omdbapi.com/?i=tt3896198&apikey=f95b9c0d';
const api_key = 'f95b9c0d';
// const search = 'tom and jerry';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    return JSON.parse(localStorage.getItem('watchedMovie'));
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorOccur, setErrorOccur] = useState('');
  const [query, setQuery] = useState('car');
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${api_key}&s=${query}`
          );

          if (!res.ok) {
            // IF SOME THING GONE WRONG
            throw new Error('Some thing went wrong');
          }

          const data = await res.json();
          if (data.Response === 'False') {
            // IF FETCHED DATA DOES NOT FOUND
            throw new Error(data.Error);
          }
          setMovies(data.Search);
        } catch (err) {
          setErrorOccur(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      setSelectedMovie(null);
      fetchMovies();
    },
    [query]
  );

  function handleAddWatchedMovie(newMovie) {
    setWatched((watched) => [
      newMovie,
      ...watched.filter((wat) => wat.imdbID !== newMovie.imdbID),
    ]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((wat) => wat.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('watchedMovie', JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loading />
          ) : ErrorOccur ? (
            <ErrorComponent message={ErrorOccur} />
          ) : (
            <MoviesList movies={movies} setSelectedMovie={setSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              onClose={setSelectedMovie}
            />
          ) : (
            <>
              <MoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedMovie, onAddWatchedMovie, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [isRated, setIsRated] = useState(false);
  // console.log(movie.Title);
  useEffect(
    function () {
      setIsLoading(true);
      async function fetchDetail() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${api_key}&i=${selectedMovie}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
        // console.log(data);
      }
      fetchDetail();
    },
    [selectedMovie]
  );

  useEffect(
    function () {
      if (movie.Title) {
        document.title = `Movie | ${movie.Title}`;
      }
      return () => {
        document.title = 'usePopcorn';

        // console.log('run at the end', movie.Title);
        // console.log(
        //   'and still remember then the tittle after the user effect is unmounted because of CLOSURE'
        // );
        // console.log('!remember clean up function run after effect is removed');
      };
    },
    [movie]
  );

  let newWatchedMovie = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    runtime: movie.Runtime ? movie.Runtime.split(' ')[0] : 0,
    imdbRating: movie.imdbRating,
    userRating: movie.userRating,
  };

  function handleUserRating(rate) {
    setMovie((movie) => {
      return { ...movie, userRating: rate };
    });
    setIsRated(true);
  }

  function closeMoviesDetails() {
    onClose(null);
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.key === 'Escape') {
          closeMoviesDetails((selectedMovie) => null);
          console.log('Closed');
        }
      }
      document.addEventListener('keydown', callback);
      return () => document.removeEventListener('keydown', callback);
    },
    [closeMoviesDetails]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeMoviesDetails}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <Rating
                maxRating={10}
                size={24}
                color="#ffd700"
                onSetRating={handleUserRating}
              />
            </div>
            {isRated && (
              <button
                className="btn-add btn"
                onClick={() => {
                  onAddWatchedMovie(newWatchedMovie);
                  closeMoviesDetails();
                }}
              >
                Add to list
              </button>
            )}
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function ErrorComponent({ message }) {
  return (
    <div className="error">
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="loader">
      <p>Loading...</p>
    </div>
  );
}

function changeTittle({ selectedMovie }) {
  // console.log('change tittle,', selectedMovie);
  // document.title = selectedMovie
}

function Movies({ movie, setSelectedMovie }) {
  return (
    <li
      onClick={() => {
        setSelectedMovie(movie.imdbID);
        // console.log('CHANEG', movie.Title);
        // document.title = movie.Title;
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MoviesList({ movies, setSelectedMovie }) {
  // console.log(movies);
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          key={movie.imdbID}
          setSelectedMovie={setSelectedMovie}
        />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieItem({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(movie.imdbID)}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          movie={movie}
          key={movie.imdbID}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && <>{children}</>}
    </div>
  );
}
console.timeEnd('start');
