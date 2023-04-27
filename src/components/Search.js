import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Search(props) {
  const [allMovies, setAllMovies] = useState([]);

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
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  console.log(allMovies);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          ></Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Search;
