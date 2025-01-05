import React, { useState } from "react";
import axios from "axios";

function AddMovie({ onAddMovie }) {
    const [formData, setFormData] = useState({
        title: "",
        director: "",
        metascore: "",
        genre: "",
        popular: false,
        description: "",
        image: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "https://movie-list-be-p4od.onrender.com/api/movies",
                formData
            )
            .then((response) => {
                onAddMovie(response.data);
                console.log(response);
                setFormData({
                    title: "",
                    director: "",
                    metascore: "",
                    genre: "",
                    popular: false,
                    description: "",
                    image: "",
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Metascore:</label>
                    <input
                        type="number"
                        name="metascore"
                        value={formData.metascore}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Popular:</label>
                    <input
                        type="checkbox"
                        name="popular"
                        checked={formData.popular}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovie;
