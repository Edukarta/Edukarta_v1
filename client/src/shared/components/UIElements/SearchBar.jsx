import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={classes.searchBar_container}>
      <TextField
      placeholder="Search for schools"
        sx={{ width: "100%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton sx={{ color: "blue" }}>
                <Search sx={{ fontSize: "20px" }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "0 10px",
            "& .MuiInputBase-input": {
              height: "10px",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
