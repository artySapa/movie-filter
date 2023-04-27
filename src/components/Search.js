import React, { useState, useEffect } from "react";
import axios from "axios";

import Selector from "./Selector/Selector";

import "./Search.css";

import { Button } from "@mui/material";

function Search(props) {
  const [allMovies, setAllMovies] = useState({});
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

  const addMovieToYears = (movie, year) => {
    if (finalYears[movie]?.has(year)) { // if movie is already there return
        return;
    }
    setFinalYears((prevState) => ({
      ...prevState,
      [movie]: [year],
    }));
  };

  const addMovieToRatings = (movie, rating) => {
    if (finalRatings[movie]?.has(rating)) { // if movie is already there return
        return;
    }
    setFinalRatings((prevState) => ({
      ...prevState,
      [movie]: [rating],
    }));
  };

  const getAllMovies = () => {
    axios
      .request(options)
      .then((response) => {
        setAllMovies(response.data)
        const movieGenre = {};
        const genreMovie={};
        for (let i = 0; i < response.data.length; i++) {
          movieGenre[response.data[i].title] = response.data[i].genre;
          for (let j = 0; j < response.data[i].genre.length; j++) {
            // genreMovie[response.data[i].genre[j]] = response.data[i].title;
            addMovieToGenre(response.data[i].genre[j], response.data[i].title);
          }
          addMovieToYears(response.data[i].title, response.data[i].year);
          addMovieToRatings(response.data[i].title, response.data[i].rating);
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

//   console.log(finalRatings);
  const generateRandomMovie = (genre, year, rating) => {
    if(genre === "" || year === "" || rating === ""){return;}
    // console.log("GENRE:" + genre);
    // console.log("YEAR:" + year.slice(5,9)); // slicing (0 4) , (5 9)
    // console.log("RATING:" + rating.slice(2,3)); // slicing (0 1), (2 3)
    const yearFirst = parseInt(year.slice(0,4));
    const yearSecond = parseInt(year.slice(5,9));
    const ratingFirst = parseInt(rating.slice(0,1));
    const ratingSecond = parseInt(rating.slice(2,3));

    const givenMovies = finalGenres[genre];
    let firstResult = "";
    let secondResult = "";
    let finalResult = "";
    for(let i = 0; i < givenMovies.length; i++){
        const single = givenMovies[i];
        console.log(single);
        console.log(finalYears[single]); // TODO: GIVES UNDEFINED
        console.log(finalRatings[single]); // TODO: GIVES UNDEFINED
        if(parseInt(single.year) <= yearSecond && parseInt(single.year) >= parseInt(yearFirst)){
            firstResult = single;
            if(parseInt(single.rating) <= ratingSecond && parseInt(single.rating) >= ratingFirst){
                secondResult = single;
                break;
            }
        }
    }
    if(secondResult !== ""){
        finalResult = secondResult;
    }
    else if(firstResult !== ""){
        finalResult = firstResult;
    }
    else{
        finalResult = "No movie based on given API";
    }
    //console.log(finalResult);
  }
  return (
    <div className="filter-body">
        <h1 className="header">Set the movie filters:</h1>
          <Selector className = "option" name="Genre" unique={uniqueGenres} selected={selectedGenre} setSelected={setSelectedGenre}/>
          <Selector className = "option" name="Time" unique={years} selected={selectedYear} setSelected={setSelectedYear}/>
          <Selector className = "option" name="Rating" unique={ratings} selected={selectedRating} setSelected={setSelectedRating}/>
        <Button variant="filled" onClick={generateRandomMovie(selectedGenre, selectedYear, selectedRating)} sx={{color: "white", backgroundColor:"rgb(0, 136, 255)", marginTop: "40px", "&:hover": {backgroundColor: "rgb(126, 128, 248)",}}}>Randomize</Button>
    </div>
  );
}

export default Search;

// have
// {genre: movies}
// {year: movies}