import React from "react";
import Search from "./components/Search";
import popcorn from '../src/assets/popcorn.png';
import "./App.css";

function App() {
  return (
    <body>
      <div className="logo-name">
            <img className="logopic" src={popcorn} alt="your-image"></img>
            <h1 className="header">FilmIt!</h1>
        </div>
      <style>{"body { background-color: rgb(0, 1, 72); }"}</style>
      <div className="page-body">
        <Search />
      </div>
    </body>
  );
}

export default App;
