import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cart: [],
  schools: [],
  school: null,
  searchQuery: "",
  searchFilter: [],
  searchResults: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 8,
    totalCount: 0,
  },
  filters : [],
  isFiltering: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = [];
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = [];
    },
    setCartItem: (state, action) => {
      state.cart = action.payload.cart;
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
    setFiltersQuery: (state, action) => {
      state.searchFilter = action.payload.searchFilter;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.totalCount = action.payload.totalCount;
    },
    setFilters : (state, action) => {
      state.filters = action.payload;
    },
    setIsFiltering: (state, action) => {
      state.isFiltering = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setSchools,
  setSchool,
  updateUser,
  setSearchResults,
  setQuery,
  setCartItem,
  setPagination,
  setFilters,
  setFiltersQuery,
  setIsFiltering
} = authSlice.actions;
export default authSlice.reducer;
