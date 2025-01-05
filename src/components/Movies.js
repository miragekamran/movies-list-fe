import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMovie from "./AddMovie";

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get("https://movie-list-be-p4od.onrender.com/api/movies")
            .then((response) => {
                setMovies(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const addMovie = (newMovie) => {
        setMovies([...movies, newMovie]);
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://movie-list-be-p4od.onrender.com/api/movies/${id}`)
            .then((response) => {
                console.log(response);
                setMovies(movies.filter((movie) => movie.movie_id !== id));
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleUpdate = (id, updatedMovie) => {
        axios
            .put(
                `https://movie-list-be-p4od.onrender.com/api/movies/${id}`,
                updatedMovie
            )
            .then((response) => {
                setMovies(
                    movies.map((movie) =>
                        movie.movie_id === id ? response.data : movie
                    )
                );
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div className="gallery">
                {movies.map((movie) => (
                    <div className="gallery-item" key={movie.movie_id}>
                        <img src={movie.image} alt="" />
                        <h2>{movie.title}</h2>
                        <div>
                            <h4>Director: {movie.director}</h4>
                            <h6>Genre: {movie.genre}</h6>
                            <h5>Popular: {movie.popular}</h5>
                            <p>Description: {movie.description}</p>
                        </div>
                        <button onClick={() => handleDelete(movie.movie_id)}>
                            Delete
                        </button>
                        <button
                            onClick={() =>
                                handleUpdate(movie.movie_id, {
                                    ...movie,
                                    title: `${movie.title} (Updated)`,
                                })
                            }
                        >
                            Update
                        </button>
                    </div>
                ))}
            </div>
            <AddMovie onAddMovie={addMovie} />
        </div>
    );
}

export default Movies;

