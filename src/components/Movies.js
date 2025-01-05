import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null); // Tracks the movie being edited
    const [updatedDetails, setUpdatedDetails] = useState({}); // Tracks the updated details for the movie
    const [descriptionVisibility, setDescriptionVisibility] = useState({}); // Tracks visibility for each movie description
    const [addDialogOpen, setAddDialogOpen] = useState(false); // Controls the "Add Movie" dialog visibility
    const [newMovie, setNewMovie] = useState({
        title: "",
        director: "",
        genre: "",
        description: "",
        metascore: 0,
        image: "",
    }); // Tracks the new movie details

    useEffect(() => {
        axios("https://movie-list-be-p4od.onrender.com/api/movies")
            .then((response) => {
                setMovies(response.data);
                // Initialize visibility state for descriptions
                const visibilityState = response.data.reduce((acc, movie) => {
                    acc[movie.movie_id] = false;
                    return acc;
                }, {});
                setDescriptionVisibility(visibilityState);
            })
            .catch((error) => console.log(error));
    }, []);

    const toggleDescription = (id) => {
        setDescriptionVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://movie-list-be-p4od.onrender.com/api/movies/${id}`)
            .then(() => {
                setMovies(movies.filter((movie) => movie.movie_id !== id));
            })
            .catch((error) => console.error(error));
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
                setEditingMovie(null); // Close the dialog
            })
            .catch((error) => console.error(error));
    };

    const openEditDialog = (movie) => {
        setEditingMovie(movie);
        setUpdatedDetails(movie); // Pre-fill the form with existing details
    };

    const handleEditChange = (field, value) => {
        setUpdatedDetails({ ...updatedDetails, [field]: value });
    };

    const closeEditDialog = () => {
        setEditingMovie(null);
    };

    const openAddDialog = () => {
        setAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleAddMovie = () => {
        axios
            .post(
                "https://movie-list-be-p4od.onrender.com/api/movies",
                newMovie
            )
            .then((response) => {
                setMovies([...movies, response.data]);
                setAddDialogOpen(false); // Close the dialog
                setNewMovie({
                    title: "",
                    director: "",
                    genre: "",
                    description: "",
                    metascore: 0,
                    image: "",
                }); // Reset the form
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="center-container">
            <h1 className="Title">Movie List</h1>

            <div className="card card2">
                {movies.map((movie) => (
                    <div className="card" key={movie.movie_id}>
                        <Card sx={{ maxWidth: 300 }}>
                            <div>
                                <div className="img">
                                    <CardMedia>
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                        />
                                    </CardMedia>
                                </div>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Genre: <em>{movie.genre}</em>
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Director: <em>{movie.director}</em>
                                    </Typography>
                                    <Rating
                                        name="half-rating"
                                        defaultValue={movie.metascore}
                                        precision={0.5}
                                        readOnly
                                    />
                                    {descriptionVisibility[movie.movie_id] && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {movie.description}
                                        </Typography>
                                    )}
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                toggleDescription(
                                                    movie.movie_id
                                                )
                                            }
                                        >
                                            {descriptionVisibility[
                                                movie.movie_id
                                            ]
                                                ? "Hide Details"
                                                : "Details"}
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                openEditDialog(movie)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                handleDelete(movie.movie_id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <Button variant="contained" color="primary" onClick={openAddDialog}>
                Add New Movie
            </Button>

            {/* Add Movie Dialog */}
            <Dialog open={addDialogOpen} onClose={closeAddDialog}>
                <DialogTitle>Add New Movie</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={newMovie.title}
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, title: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Director"
                        type="text"
                        fullWidth
                        value={newMovie.director}
                        onChange={(e) =>
                            setNewMovie({
                                ...newMovie,
                                director: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Genre"
                        type="text"
                        fullWidth
                        value={newMovie.genre}
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, genre: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        value={newMovie.description}
                        onChange={(e) =>
                            setNewMovie({
                                ...newMovie,
                                description: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Metascore"
                        type="number"
                        fullWidth
                        value={newMovie.metascore}
                        onChange={(e) =>
                            setNewMovie({
                                ...newMovie,
                                metascore: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={newMovie.image}
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, image: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDialog}>Cancel</Button>
                    <Button onClick={handleAddMovie}>Add Movie</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Movie Dialog */}
            {editingMovie && (
                <Dialog open={Boolean(editingMovie)} onClose={closeEditDialog}>
                    <DialogTitle>Edit Movie</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={updatedDetails.title || ""}
                            onChange={(e) =>
                                handleEditChange("title", e.target.value)
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Director"
                            type="text"
                            fullWidth
                            value={updatedDetails.director || ""}
                            onChange={(e) =>
                                handleEditChange("director", e.target.value)
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Genre"
                            type="text"
                            fullWidth
                            value={updatedDetails.genre || ""}
                            onChange={(e) =>
                                handleEditChange("genre", e.target.value)
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            value={updatedDetails.description || ""}
                            onChange={(e) =>
                                handleEditChange("description", e.target.value)
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Metascore"
                            type="number"
                            fullWidth
                            value={updatedDetails.metascore || ""}
                            onChange={(e) =>
                                handleEditChange("metascore", e.target.value)
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeEditDialog}>Cancel</Button>
                        <Button
                            onClick={() =>
                                handleUpdate(
                                    editingMovie.movie_id,
                                    updatedDetails
                                )
                            }
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
