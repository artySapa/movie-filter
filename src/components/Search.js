import React, { useState, useEffect } from "react";
import axios from "axios";

import Selector from "./Selector/Selector";

import "./Search.css";

import { Button } from "@mui/material";

function Search(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState({});
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueRating, setUniqueRating] = useState([]);

  const [finalGenres, setFinalGenres] = useState({});
  const [finalYears, setFinalYears] = useState({});
  const [finalRatings, setFinalRatings] = useState({});

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const years = ["1900-1950", "1950-1970", "1970-1990", "1990-2000", "2000-2010", "2010-2023"];
  const ratings = ["0-4", "5-6", "7-8", "9-10"];

  const options = {
    method: "GET",
    url: "https://imdb-top-100-movies.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "b16bfd0606mshfb63a29ced1ea03p12edb7jsncfabd8933bbd",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };

  const addMovieToGenre = (genre, movie) => {
    if (finalGenres[genre]?.has(movie)) { // if movie is already there return
        return;
    }
    setFinalGenres((prevState) => ({
      ...prevState,
      [genre]: [...(prevState[genre] || []), movie],
    }));
  };

  const addMovieToYears = (year, movie) => {
    if (finalYears[year]?.has(movie)) { // if movie is already there return
        return;
    }
    setFinalYears((prevState) => ({
      ...prevState,
      [year]: [...(prevState[year] || []), movie],
    }));
  };

  const addMovieToRatings = (rating, movie) => {
    if (finalRatings[rating]?.has(movie)) { // if movie is already there return
        return;
    }
    setFinalRatings((prevState) => ({
      ...prevState,
      [rating]: [...(prevState[rating] || []), movie],
    }));
  };

  const getAllMovies = () => {
    axios
      .request(options)
      .then((response) => {
        setAllMovies(response.data);
        const movieGenre = {};
        const genreMovie={};
        for (let i = 0; i < response.data.length; i++) {
          movieGenre[response.data[i].title] = response.data[i].genre;
          for (let j = 0; j < response.data[i].genre.length; j++) {
            // genreMovie[response.data[i].genre[j]] = response.data[i].title;
            addMovieToGenre(response.data[i].genre[j], response.data[i].title);
          }
          addMovieToYears(response.data[i].year, response.data[i].title);
          addMovieToRatings(response.data[i].rating, response.data[i].title);
        }
        // setFinalGenres(genreMovie);
        // setMoviesGenres(movieGenre);

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

  console.log(finalRatings);
  const generateRandomMovie = () => {}

  return (
    <div className="filter-body">
        <h1 className="header">Set the movie filters:</h1>
          <Selector className = "option" name="Genre" unique={uniqueGenres} selected={selectedGenre} setSelected={setSelectedGenre}/>
          <Selector className = "option" name="Time" unique={years} selected={selectedYear} setSelected={setSelectedYear}/>
          <Selector className = "option" name="Rating" unique={ratings} selected={selectedRating} setSelected={setSelectedRating}/>
        <Button variant="filled" onClick={generateRandomMovie} sx={{color: "white", backgroundColor:"rgb(0, 136, 255)", marginTop: "40px", "&:hover": {backgroundColor: "rgb(126, 128, 248)",}}}>Randomize</Button>
    </div>
  );
}

export default Search;

// have
// {genre: movies}
// {year: movies}