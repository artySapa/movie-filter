import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Search.css";

import Selector from "./Selector/Selector";

function Search(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState({});
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueRating, setUniqueRating] = useState([]);

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
            // Check if the genre is already in the unique array
            if (!unique.includes(genre)) {
              // If the genre is not already in the array, add it
              unique.push(genre);
            }
          }
        }
        setUniqueGenres(unique);

        const uniqueYear = [];
        for (let i = 0; i < response.data.length; i++) {
            const year = response.data[i].year;
            // Check if the genre is already in the unique array
            if (!uniqueYear.includes(year)) {
              // If the genre is not already in the array, add it
              uniqueYear.push(year);
            }
          }
        setUniqueYears(uniqueYear.sort());

        const uniqueRating = [];
        for (let i = 0; i < response.data.length; i++) {
            const year = response.data[i].rating;
            // Check if the genre is already in the unique array
            if (!uniqueRating.includes(year)) {
              // If the genre is not already in the array, add it
              uniqueRating.push(year);
            }
          }
        setUniqueRating(uniqueRating.sort());
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  console.log(moviesGenres);

  return (
    <div className="filter-body">
        <h1 className="header">Set the movie filters:</h1>
      <div className="selector">
          <Selector className = "option" name="Genre" unique={uniqueGenres}/>
          <Selector className = "option" name="Time" unique={uniqueYears}/>
          <Selector className = "option" name="Rating" unique={uniqueRating}/>
      </div>
    </div>
  );
}

export default Search;
