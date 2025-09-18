import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    adminData: null, // stores logged-in admin details
    token: null,     // JWT token
    error: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // when login request starts
        toggleLoading: (state, action) => {
            state.loading = action.payload;
        },

        // when login success
        setAdminData: (state, action) => {
            state.adminData = action.payload.admin;
            state.token = action.payload.token;
            state.error = null;
            state.loading = false;
        },

        // when login fails
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // logout
        clearAdminData: (state) => {
            state.adminData = null;
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { toggleLoading, setAdminData, setError, clearAdminData } =
    adminSlice.actions;

export default adminSlice.reducer;
