import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    schools: [],
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
      updateUser: (state, action) => {
        state.user = action.payload;
      },
    },
  });
  
  export const {setLogin, setLogout, setSchools, updateUser} = authSlice.actions;
  export default authSlice.reducer;