import React, { useState, useEffect } from "react";
import axios from "axios";

import Selector from "./Selector/Selector";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import "./Search.css";

import { Button } from "@mui/material";

function Search(props) {
  const [allMovies, setAllMovies] = useState({});
  const [uniqueGenres, setUniqueGenres] = useState([]);

  const [finalGenres, setFinalGenres] = useState({});
  const [finalYears, setFinalYears] = useState({});
  const [finalRatings, setFinalRatings] = useState({});

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const[firstYear, setFirstYear] = useState(1970);
  const[secondYear, setSecondYear] = useState(2000);

  const [value, setValue] = React.useState([1970, 2000]);
  const handleChange = (e) => {
    setValue(e.target.value);
    setFirstYear(value[0]);
    setSecondYear(value[1]);
  }

  const [response, setResponse] = useState("");
  const [expanded, setExpanded] = useState(false); // TODO: change it to the router function
  const [movieData, setMovieData] = useState({});

  const years = [
    "1900-1950",
    "1950-1970",
    "1970-1990",
    "1990-2000",
    "2000-2010",
    "2010-2023",
  ];
  const ratings = ["1-4", "5-6", "7-8", "9-10"];

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
    if (finalGenres[genre]?.has(movie)) {
      // if movie is already there return
      return;
    }
    setFinalGenres((prevState) => ({
      ...prevState,
      [genre]: [...(prevState[genre] || []), movie],
    }));
  };

  const addMovieToYears = (movie, year) => {
    if (finalYears[movie]?.has(year)) {
      // if movie is already there return
      return;
    }
    setFinalYears((prevState) => ({
      ...prevState,
      [movie]: [year],
    }));
  };

  const addMovieToRatings = (movie, rating) => {
    if (finalRatings[movie]?.has(rating)) {
      // if movie is already there return
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
        if (response.data.length === 0) {
            console.log("No movie based on given API");
            return;
          }
        setAllMovies(response.data);
        const movieGenre = {};
        const genreMovie = {};
        for (let i = 0; i < response.data.length; i++) {
          movieGenre[response.data[i].title] = response.data[i].genre;
          for (let j = 0; j < response.data[i].genre.length; j++) {
            // genreMovie[response.data[i].genre[j]] = response.data[i].title;
            addMovieToGenre(response.data[i].genre[j], response.data[i].title);
          }
          addMovieToYears(response.data[i].title, response.data[i].year);
          addMovieToRatings(response.data[i].title, response.data[i].rating);
        }

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
    getAllMovies();;
  }, []);

  useEffect(() => {
    console.log("logging");
  }, [selectedGenre, selectedYear, selectedRating, finalGenres, finalRatings, finalYears, response, firstYear, secondYear, value, expanded, response, movieData]);

  const generateRandomMovie = (genre, year, rating) => {
    if (genre === "" || firstYear === 0 || secondYear === 0 || rating === "") {
        setExpanded(false);
        alert("Please fill out the filters :)");
        return "";
    }

    const yearFirst = firstYear;
    const yearSecond = secondYear;
    const ratingFirst = parseInt(rating.slice(0,1));
    const ratingSecond = parseInt(rating.slice(2,3));

    const givenMovies = finalGenres[genre];
    let firstResult = [];
    let secondResult = [];
    let finalResult = [];
    for (let i = 0; i < givenMovies.length; i++) {
      const single = givenMovies[i];
      if (
        parseInt(finalYears[single]) <= yearSecond &&
        parseInt(finalYears[single]) >= parseInt(yearFirst)
      ) {
        firstResult.push(single);
        if (
          finalRatings[single][0] <= ratingSecond &&
          finalRatings[single][0] >= ratingFirst
        ) {
          secondResult.push(single);
          continue;
        }
      }
    }

    //secondResult is for the case if I get a better API
    // console.log("FIRST: " + firstResult);
    // console.log("SECOND: " + secondResult);

    if (secondResult !== []) {
      finalResult = firstResult;
    } else if (firstResult !== []) {
      finalResult = firstResult; //change to Second result
    } else {
    setExpanded(false);
      alert("No movie based on given API");
      return "";
    }

    if(finalResult.length === 0){
        setExpanded(false);
        alert("No movie based on given API");
        return "";
    }
    const randIndex = Math.floor(Math.random() * (finalResult.length - 1)) + 1;
    // console.log("recommendation: " + finalResult[randIndex]);

    return finalResult[randIndex];
  };

  const findMovieData = (movie) => {
    const tempMovieData = {};
    for (let i = 0; i < allMovies.length; i++) {
      tempMovieData[allMovies[i].title] = [];
      tempMovieData[allMovies[i].title].push(allMovies[i].image);
      tempMovieData[allMovies[i].title].push(allMovies[i].description);
      tempMovieData[allMovies[i].title].push(allMovies[i].trailer);
    }
    setMovieData(tempMovieData);

    // console.log(movieData[movie]);
  }

  return (
    <div className="filter-body">
        <div>
            <h1 className="header">What would you like to watch?</h1>
      <Selector
        className="option"
        name="Genre"
        unique={uniqueGenres}
        selected={selectedGenre}
        setSelected={setSelectedGenre}
      />
      <h1 className="time-header">Time (1950-2023): </h1>
      <Box sx={{ width: 200, marginLeft: "98px", padding:"10px", backgroundColor:"rgb(242, 190, 19)", borderRadius: "15px"}}>
      <Slider
        getAriaLabel={() => 'Ages range'}
        value={value}
        defaultValue={2000}
        min={1950}
        max={2023}
        onChange={(e) => handleChange(e)}
        valueLabelDisplay="auto"
    />
    </Box>
      <Selector
        className="option"
        name="Rating"
        unique={ratings}
        selected={selectedRating}
        setSelected={setSelectedRating}
      />
      <Button
        variant="filled"
        onClick={() => {
          setExpanded(true);
          setResponse(generateRandomMovie(selectedGenre, selectedYear, selectedRating));
          findMovieData(response);
        }}
        sx={{
          color: "white",
          backgroundColor: "rgb(0, 136, 255)",
          marginTop: "40px",
          "&:hover": { backgroundColor: "rgb(126, 128, 248)" },
        }}
      >
        Randomize
      </Button>
      
      { expanded &&
      <Button
        variant="filled"
        onClick={() => {
          setExpanded(false);
        }}
        sx={{
          color: "white",
          backgroundColor: "rgb(0, 136, 255)",
          marginTop: "40px",
          marginLeft: "15px",
          "&:hover": { backgroundColor: "rgb(126, 128, 248)" },
        }}
      >
        Minimize
      </Button>
    }
      </div>


      {
            expanded &&
            <div className="random-result">
                <h1 className="header-res">{response}</h1>
                <div className="image-description">
                <img src={movieData[response][0]} alt="No internet connection"></img>
                <p>{movieData[response][1]}</p>
                </div>
                <h2 className="header-res"> TRAILER: </h2>
                <iframe 
                    width="560" 
                    height="315" 
                    src={movieData[response][2]} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </div>
      }
    </div>
  );
}

export default Search;