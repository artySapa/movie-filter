import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Search(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState({});
  const [uniqueGenres, setUniqueGenres] = useState([]);

  const options = {
    method: "GET",
    url: "https://imdb-top-100-movies.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "b16bfd0606mshfb63a29ced1ea03p12edb7jsncfabd8933bbd",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };

  const getAllMovies = () => {
    axios
      .request(options)
      .then((response) => {
        setAllMovies(response.data);
        const movieGenre = {};
        for (let i = 0; i < response.data.length; i++) {
          movieGenre[response.data[i].title] = response.data[i].genre;
        }
        setMoviesGenres(movieGenre);

        const unique = [];

        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].genre.length; j++) {
              const genre = response.data[i].genre[j];
              // Check if the genre is already in the uniqueGenres array
              if (!unique.includes(genre)) {
                // If the genre is not already in the array, add it
                unique.push(genre);
              }
            }
          }

          setUniqueGenres(unique);

      })
      .catch(console.error);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  console.log(moviesGenres);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            {uniqueGenres.map((genre, i) => (
              <MenuItem key={i}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Search;