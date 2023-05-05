import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    schools: [],
    school: null,
    searchQuery: "",
    searchResults: [],
};

export const authSlice = createSlice({
  
    name: "auth",
    initialState,
    reducers: {
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      setSchools: (state, action) => {
        state.schools = action.payload.schools;
      },
      setSchool: (state, action) => {
        state.school = action.payload.school;
      },
      updateUser: (state, action) => {
        state.user = action.payload;
      },
      setQuery: (state, action) => {
        state.searchQuery = action.payload;
      },
      setSearchResults: (state, action) => {
        state.searchResults = action.payload;
    },
    },
  });
  
  export const {setLogin, setLogout, setSchools, setSchool, updateUser, setSearchResults, setQuery} = authSlice.actions;
  export default authSlice.reducer;