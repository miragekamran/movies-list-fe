import React, { useState, useEffect } from "react";
import axios from "axios";

function Movies() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        axios
            .get("https://movies-list.herokuapp.com/api/movies/")
            .then((response) => {
                console.log(response);
                setMovie(response.data.results);
            })
            .catch((error) => {
                console.log(error, "data is not found");
            });
    }, []);
    return <div></div>;
}

export default Movies;
