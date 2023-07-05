import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    places: [],
    isLoading: true,
};

export const getPlacesData = createAsyncThunk(
    'places/getPlacesData',
    async () => {
        const response = await axios.get('http://localhost:5000/api/v1/places');
        return response.data.places;
    }
)

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: {
        [getPlacesData.pending]: (state) => {
            state.isLoading = true;
        },
        [getPlacesData.fulfilled]: (state, action) => {
            state.places = action.payload;
            state.isLoading = false;
        },
        [getPlacesData.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})

export default placesSlice.reducer