import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import './Selector.css'

function Selector(props) {
    const [selectedGenre, setSelectedGenre] = useState("");
  return (
    <div className="select-body">
      <h2>{props.name}:</h2>
      <Box sx={{ minWidth: "50%", color: "black" }}>
        <FormControl sx={{ width: "100%", color: "black", marginLeft: "25px" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ width: "100%", color: "black" }}
          ></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Genre"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
            }}
            sx={{
              width: "50%",
              color: "black",
              backgroundColor: "rgb(242, 190, 19)",
              marginTop: "5px",
            }}
          >
            {props.unique.map((genre, i) => (
              <MenuItem key={i} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Selector;
